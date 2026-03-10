import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SaleProductItem } from './entities/sale-product-item.entity';
import { CreateSaleProductItemDto } from './dto/create-sale-product-item.dto';
import { UpdateSaleProductItemDto } from './dto/update-sale-product-item.dto';
import { Sale } from 'src/sale/entities/sale.entity';
import { ProductItem } from '../product-item/entities/product-item.entity';

@Injectable()
export class SaleProductItemService {
  constructor(
    @InjectRepository(SaleProductItem)
    private saleProductItemRepository: Repository<SaleProductItem>,

    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,

    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>,

    private dataSource: DataSource,
  ) {}

  // =========================================================
  // CREATE  → diminui estoque da quantidade usada
  // =========================================================
  async create(data: CreateSaleProductItemDto) {
    return await this.dataSource.transaction(async (manager) => {
      const sale = await manager.findOne(Sale, {
        where: { id: data.sale_id },
      });
      if (!sale)
        throw new NotFoundException(
          `Venda com ID ${data.sale_id} não encontrada`,
        );

      const productItem = await manager.findOne(ProductItem, {
        where: { id: data.product_item_id },
      });
      if (!productItem)
        throw new NotFoundException(
          `Produto com ID ${data.product_item_id} não encontrado`,
        );

      if (productItem.quantity < data.quantity)
        throw new BadRequestException(`Estoque insuficiente.`);

      // diminuir estoque
      productItem.quantity -= data.quantity;
      await manager.save(productItem);

      const saleProductItem = manager.create(SaleProductItem, {
        sale,
        product_item: productItem,
        quantity: data.quantity,
        price: data.price,
      });

      const saved = await manager.save(SaleProductItem, saleProductItem);

      // 🔥 AGORA RETORNA O OBJETO COMPLETO (FUNDAMENTAL!)
      return manager.findOne(SaleProductItem, {
        where: { id: saved.id },
        relations: ['sale', 'product_item', 'product_item.product'],
      });
    });
  }

  // =========================================================
  // FIND ONE
  // =========================================================
  async findOne(id: number) {
    const saleProductItem = await this.saleProductItemRepository.findOne({
      where: { id },
      relations: ['sale', 'product_item', 'product_item.product'],
    });

    if (!saleProductItem)
      throw new NotFoundException(`Item da venda com ID ${id} não encontrado`);

    return saleProductItem;
  }

  // =========================================================
  // UPDATE  → ajusta estoque pela diferença
  // =========================================================
  async update(id: number, updateDto: UpdateSaleProductItemDto) {
    return await this.dataSource.transaction(async (manager) => {
      const existing = await manager.findOne(SaleProductItem, {
        where: { id },
        relations: ['product_item'],
      });

      if (!existing)
        throw new NotFoundException(
          `Item da venda com ID ${id} não encontrado`,
        );

      const productItem = await manager.findOne(ProductItem, {
        where: { id: updateDto.product_item_id ?? existing.product_item.id },
      });

      if (!productItem)
        throw new NotFoundException(
          `Produto com ID ${updateDto.product_item_id} não encontrado`,
        );

      // SE TROCAR O PRODUTO
      if (
        updateDto.product_item_id &&
        updateDto.product_item_id !== existing.product_item.id
      ) {
        // repõe estoque do antigo
        existing.product_item.quantity += existing.quantity;
        await manager.save(existing.product_item);

        // diminuir estoque do novo
        if (productItem.quantity < (updateDto.quantity ?? existing.quantity))
          throw new BadRequestException('Estoque insuficiente');

        productItem.quantity -= updateDto.quantity ?? existing.quantity;
        await manager.save(productItem);

        existing.product_item = productItem;
        existing.quantity = updateDto.quantity ?? existing.quantity;
        existing.price = updateDto.price ?? existing.price;

        const saved = await manager.save(SaleProductItem, existing);

        //  RETORNA O OBJETO COMPLETO
        return manager.findOne(SaleProductItem, {
          where: { id: saved.id },
          relations: ['sale', 'product_item', 'product_item.product'],
        });
      }

      // SE NÃO TROCOU O PRODUTO → ajustar diferença
      const newQty = updateDto.quantity ?? existing.quantity;
      const diff = newQty - existing.quantity;

      if (diff > 0) {
        if (productItem.quantity < diff)
          throw new BadRequestException('Estoque insuficiente');
        productItem.quantity -= diff;
      } else if (diff < 0) {
        productItem.quantity += Math.abs(diff);
      }

      await manager.save(productItem);

      existing.quantity = newQty;
      existing.price = updateDto.price ?? existing.price;

      const saved = await manager.save(SaleProductItem, existing);

      //  RETORNA O OBJETO COMPLETO
      return manager.findOne(SaleProductItem, {
        where: { id: saved.id },
        relations: ['sale', 'product_item', 'product_item.product'],
      });
    });
  }

  // =========================================================
  // REMOVE  → repõe estoque
  // =========================================================
  async remove(id: number) {
    return await this.dataSource.transaction(async (manager) => {
      const saleProductItem = await manager.findOne(SaleProductItem, {
        where: { id },
        relations: ['product_item'],
      });

      if (!saleProductItem)
        throw new NotFoundException(
          `Item da venda com ID ${id} não encontrado`,
        );

      // repõe estoque
      saleProductItem.product_item.quantity += saleProductItem.quantity;
      await manager.save(saleProductItem.product_item);

      await manager.delete(SaleProductItem, id);

      return saleProductItem;
    });
  }
}

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
import { Sale } from '../sale/entities/sale.entity';
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

  private async findSaleForUser(
    manager: typeof this.dataSource.manager,
    saleId: string,
    userId: string,
  ) {
    const sale = await manager.findOne(Sale, {
      where: { id: saleId, userId },
    });
    if (!sale) {
      throw new NotFoundException(`Venda com ID ${saleId} não encontrada`);
    }
    return sale;
  }

  private async findProductItemForUser(
    manager: typeof this.dataSource.manager,
    productItemId: string,
    userId: string,
  ) {
    const productItem = await manager.findOne(ProductItem, {
      where: { id: productItemId, product: { userId } },
      relations: ['product'],
    });
    if (!productItem) {
      throw new NotFoundException(
        `Produto com ID ${productItemId} não encontrado`,
      );
    }
    return productItem;
  }

  private async findSaleProductItemForUser(
    manager: typeof this.dataSource.manager,
    id: number,
    userId: string,
  ) {
    const saleProductItem = await manager.findOne(SaleProductItem, {
      where: { id, sale: { userId } },
      relations: ['sale', 'product_item', 'product_item.product'],
    });

    if (!saleProductItem) {
      throw new NotFoundException(`Item da venda com ID ${id} não encontrado`);
    }

    return saleProductItem;
  }

  async create(data: CreateSaleProductItemDto, userId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const sale = await this.findSaleForUser(manager, data.sale_id, userId);

      const productItem = await this.findProductItemForUser(
        manager,
        data.product_item_id,
        userId,
      );

      if (productItem.quantity < data.quantity)
        throw new BadRequestException(`Estoque insuficiente.`);

      productItem.quantity -= data.quantity;
      await manager.save(productItem);

      const saleProductItem = manager.create(SaleProductItem, {
        sale,
        product_item: productItem,
        quantity: data.quantity,
        price: data.price,
      });

      const saved = await manager.save(SaleProductItem, saleProductItem);

      return manager.findOne(SaleProductItem, {
        where: { id: saved.id, sale: { userId } },
        relations: ['sale', 'product_item', 'product_item.product'],
      });
    });
  }

  async findOne(id: number, userId: string) {
    const saleProductItem = await this.saleProductItemRepository.findOne({
      where: { id, sale: { userId } },
      relations: ['sale', 'product_item', 'product_item.product'],
    });

    if (!saleProductItem)
      throw new NotFoundException(`Item da venda com ID ${id} não encontrado`);

    return saleProductItem;
  }

  async update(id: number, updateDto: UpdateSaleProductItemDto, userId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const existing = await this.findSaleProductItemForUser(manager, id, userId);

      const productItemId =
        updateDto.product_item_id ?? existing.product_item.id;

      const productItem = await this.findProductItemForUser(
        manager,
        productItemId,
        userId,
      );

      if (
        updateDto.product_item_id &&
        updateDto.product_item_id !== existing.product_item.id
      ) {
        existing.product_item.quantity += existing.quantity;
        await manager.save(existing.product_item);

        if (productItem.quantity < (updateDto.quantity ?? existing.quantity))
          throw new BadRequestException('Estoque insuficiente');

        productItem.quantity -= updateDto.quantity ?? existing.quantity;
        await manager.save(productItem);

        existing.product_item = productItem;
        existing.quantity = updateDto.quantity ?? existing.quantity;
        existing.price = updateDto.price ?? existing.price;

        const saved = await manager.save(SaleProductItem, existing);

        return manager.findOne(SaleProductItem, {
          where: { id: saved.id, sale: { userId } },
          relations: ['sale', 'product_item', 'product_item.product'],
        });
      }

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

      return manager.findOne(SaleProductItem, {
        where: { id: saved.id, sale: { userId } },
        relations: ['sale', 'product_item', 'product_item.product'],
      });
    });
  }

  async remove(id: number, userId: string) {
    return await this.dataSource.transaction(async (manager) => {
      const saleProductItem = await manager.findOne(SaleProductItem, {
        where: { id, sale: { userId } },
        relations: ['product_item'],
      });

      if (!saleProductItem)
        throw new NotFoundException(
          `Item da venda com ID ${id} não encontrado`,
        );

      saleProductItem.product_item.quantity += saleProductItem.quantity;
      await manager.save(saleProductItem.product_item);

      await manager.delete(SaleProductItem, id);

      return saleProductItem;
    });
  }
}

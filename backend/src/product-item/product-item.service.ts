import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, LessThanOrEqual, MoreThan, Between } from 'typeorm';
import { ProductItem } from './entities/product-item.entity';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductItemDto) {
    const product = await this.productRepository.findOne({
      where: { id: data.product_id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const productItem = this.productItemRepository.create({
      ...data,
      product,
    });

    const saved = await this.productItemRepository.save(productItem);

    return this.productItemRepository.findOne({
      where: { id: saved.id },
      relations: ['product'],
    });
  }

  findAll() {
    return this.productItemRepository.find({
      relations: ['product'],
      where: {
        quantity: Not(0),
      },
      order: {
        validity: 'ASC',
      },
    });
  }

  async getTotalStockValue(): Promise<number> {
    const productItems = await this.productItemRepository.find({
      where: { quantity: Not(0) },
    });

    const totalStockValue = productItems.reduce((sum, productItem) => {
      const productItemValue =
        (productItem.quantity ?? 0) * (productItem.cost ?? 0);
      return sum + productItemValue;
    }, 0);

    return totalStockValue;
  }

  async findOne(id: string) {
    const productItem = await this.productItemRepository.findOne({
      where: { id },
    });
    if (!productItem) {
      throw new NotFoundException('Produto não encontrado em estoque');
    }
    return productItem;
  }

  async findExpiringItems(limit = 10) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    return this.productItemRepository.find({
      relations: ['product'],
      where: {
        quantity: Not(0),
        validity: Between(today, futureDate),
      },
      order: {
        validity: 'ASC',
      },
      take: limit,
    });
  }

  async update(id: string, updateProductItemDto: UpdateProductItemDto) {
    const productItem = await this.findOne(id);

    if (updateProductItemDto.product_id) {
      const product = await this.productRepository.findOne({
        where: { id: updateProductItemDto.product_id },
      });

      if (!product) {
        throw new NotFoundException(
          `Produto com ID:${updateProductItemDto.product_id} não existe`,
        );
      }

      productItem.product = product;
      productItem.product_id = product.id;
    }

    Object.assign(productItem, updateProductItemDto);

    return this.productItemRepository.save(productItem);
  }

  async remove(id: string) {
    const productItem = await this.findOne(id);
    await this.productItemRepository.delete(id);
    return productItem;
  }
}

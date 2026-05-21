import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Between } from 'typeorm';
import { ProductItem } from './entities/product-item.entity';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private productItemRepository: Repository<ProductItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private async findProductForUser(productId: number, userId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId, userId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async create(data: CreateProductItemDto, userId: string) {
    const product = await this.findProductForUser(data.product_id, userId);

    const productItem = this.productItemRepository.create({
      ...data,
      product,
    });

    const saved = await this.productItemRepository.save(productItem);

    return this.productItemRepository.findOne({
      where: { id: saved.id, product: { userId } },
      relations: ['product'],
    });
  }

  findAll(userId: string) {
    return this.productItemRepository.find({
      relations: ['product'],
      where: {
        quantity: Not(0),
        product: { userId },
      },
      order: {
        validity: 'ASC',
      },
    });
  }

  async getTotalStockValue(userId: string): Promise<number> {
    const productItems = await this.productItemRepository.find({
      where: { quantity: Not(0), product: { userId } },
      relations: ['product'],
    });

    const totalStockValue = productItems.reduce((sum, productItem) => {
      const productItemValue =
        (productItem.quantity ?? 0) * (productItem.cost ?? 0);
      return sum + productItemValue;
    }, 0);

    return totalStockValue;
  }

  async findOne(id: string, userId: string) {
    const productItem = await this.productItemRepository.findOne({
      where: { id, product: { userId } },
      relations: ['product'],
    });
    if (!productItem) {
      throw new NotFoundException('Produto não encontrado em estoque');
    }
    return productItem;
  }

  async findExpiringItems(userId: string, limit = 10) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    return this.productItemRepository.find({
      relations: ['product'],
      where: {
        quantity: Not(0),
        validity: Between(today, futureDate),
        product: { userId },
      },
      order: {
        validity: 'ASC',
      },
      take: limit,
    });
  }

  async update(id: string, updateProductItemDto: UpdateProductItemDto, userId: string) {
    const productItem = await this.findOne(id, userId);

    if (updateProductItemDto.product_id) {
      const product = await this.findProductForUser(
        updateProductItemDto.product_id,
        userId,
      );

      productItem.product = product;
      productItem.product_id = product.id;
    }

    Object.assign(productItem, updateProductItemDto);

    return this.productItemRepository.save(productItem);
  }

  async remove(id: string, userId: string) {
    const productItem = await this.findOne(id, userId);
    await this.productItemRepository.delete(id);
    return productItem;
  }
}

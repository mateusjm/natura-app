import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(data: CreateProductDto, userId: string) {
    const product = this.productRepository.create({ ...data, userId });
    return this.productRepository.save(product);
  }

  findAll(userId: string) {
    return this.productRepository.find({ where: { userId } });
  }

  async findAllWithStock(userId: string) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.items', 'item')
      .where('product.userId = :userId', { userId })
      .addSelect('COALESCE(SUM(item.quantity), 0)', 'totalQuantity')
      .groupBy('product.id')
      .getRawAndEntities();

    return products.entities.map((product, index) => ({
      ...product,
      totalQuantity: Number(products.raw[index].totalQuantity),
    }));
  }

  async findOne(id: number, userId: string) {
    const product = await this.productRepository.findOne({
      where: { id, userId },
    });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.findOne(id, userId);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number, userId: string) {
    const product = await this.findOne(id, userId);
    await this.productRepository.delete({ id, userId });
    return product;
  }
}

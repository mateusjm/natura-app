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

  create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findAllWithStock() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.items', 'item')
      .addSelect('COALESCE(SUM(item.quantity), 0)', 'totalQuantity')
      .groupBy('product.id')
      .getRawAndEntities();

    return products.entities.map((product, index) => ({
      ...product,
      totalQuantity: Number(products.raw[index].totalQuantity),
    }));
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return product;
  }
}

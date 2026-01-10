import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      ...product,
      message: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('stock')
  async findAllWithStock() {
    return await this.productService.findAllWithStock();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      Number(id),
      updateProductDto,
    );
    return {
      ...updatedProduct,
      message: 'Produto atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(Number(id));
    return { message: 'Produto excluído com sucesso!' };
  }
}

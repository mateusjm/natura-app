import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const product = await this.productService.create(createProductDto, user.sub);
    return {
      ...product,
      message: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async findAll(@CurrentUser() user: JwtPayload) {
    return await this.productService.findAll(user.sub);
  }

  @Get('stock')
  async findAllWithStock(@CurrentUser() user: JwtPayload) {
    return await this.productService.findAllWithStock(user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @CurrentUser() user: JwtPayload) {
    return await this.productService.findOne(Number(id), user.sub);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const updatedProduct = await this.productService.update(
      Number(id),
      updateProductDto,
      user.sub,
    );
    return {
      ...updatedProduct,
      message: 'Produto atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @CurrentUser() user: JwtPayload) {
    await this.productService.remove(Number(id), user.sub);
    return { message: 'Produto excluído com sucesso!' };
  }
}

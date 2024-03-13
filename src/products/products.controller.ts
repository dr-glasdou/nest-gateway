import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from '../config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(this.productsClient.send({ cmd: 'find_one' }, { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(this.productsClient.send({ cmd: 'update' }, { id, ...updateProductDto }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(this.productsClient.send({ cmd: 'remove' }, { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { PaginationDto } from 'src/common';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.ordersClient.send('create', createOrderDto));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() pagination: OrderPaginationDto) {
    try {
      return this.ordersClient.send('findAll', pagination);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOneProduct(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(this.ordersClient.send('findOne', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findByStatus(@Param() status: StatusDto, @Query() pagination: PaginationDto) {
    try {
      return await firstValueFrom(this.ordersClient.send('findAll', { ...pagination, status: status.status }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() status: StatusDto) {
    try {
      return await firstValueFrom(this.ordersClient.send('changeStatus', { id, status: status.status }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

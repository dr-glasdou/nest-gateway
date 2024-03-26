import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.client.send('create', createOrderDto));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll(@Query() pagination: OrderPaginationDto) {
    try {
      return await firstValueFrom(this.client.send('findAll', pagination));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOneProduct(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(this.client.send('findOne', { id }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findByStatus(@Param() status: StatusDto, @Query() pagination: PaginationDto) {
    try {
      return await firstValueFrom(this.client.send('findAll', { ...pagination, status: status.status }));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() status: StatusDto) {
    try {
      return await firstValueFrom(this.client.send('changeStatus', { id, status: status.status }));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

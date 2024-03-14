import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ORDER_SERVICE, envs } from 'src/config';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMsHost,
          port: envs.ordersMsPort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}

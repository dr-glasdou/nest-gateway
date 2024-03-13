import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PRODUCT_SERVICE, envs } from '../config';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMsHost,
          port: envs.productsMsPort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}

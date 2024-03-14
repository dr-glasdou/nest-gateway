import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatusList, OrderStatus } from '../enum';
import { PaginationDto } from 'src/common';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(OrderStatusList, {
    message: `Status must be one of the following values: ${OrderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}

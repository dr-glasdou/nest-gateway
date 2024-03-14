import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  await app.listen(envs.port);
  logger.log(`Gateway is running on port ${envs.port}`);
}
bootstrap();

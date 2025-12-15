import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configConstants } from './config/global.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configConstants.port);
}
bootstrap();

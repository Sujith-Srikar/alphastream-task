import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  app.enableCors();
  await app.listen(PORT)
    .then(() =>  console.log(`Server started at ${PORT}`));
}

bootstrap();
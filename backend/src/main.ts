import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Entitlement API')
    .setDescription('API documentation for Entitlement project')
    .setVersion('1.0')
    .addTag('user')
    .addTag('client')
    .addTag('entitlement')
    .build();
    
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory,
    {
  jsonDocumentUrl: 'api-json',
}
  );

  const PORT = process.env.PORT ?? 3000;
  app.enableCors();
  await app.listen(PORT)
    .then(() =>  console.log(`Server started at ${PORT}`));
}

bootstrap();
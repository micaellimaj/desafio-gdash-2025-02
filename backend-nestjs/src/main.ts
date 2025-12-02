import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true,
      forbidNonWhitelisted: true, 
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CLIMATEBRAIN API')
    .setDescription('API de Coleta e Análise de Logs Climáticos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Weather')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'api-docs';
  SwaggerModule.setup(swaggerPath, app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);

  const appUrl = await app.getUrl()
  console.log(`\n🚀 Aplicação rodando em: ${appUrl}`);
  console.log(`📄 Documentação Swagger disponível em: ${appUrl}/${swaggerPath}\n`);
}

bootstrap();
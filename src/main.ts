import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'API test')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION || 'Routes and descriptions of API Title',
    )
    .setVersion(process.env.SWAGGER_API_VERSION || '1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port, () => console.log(`API Title started at ${port}`));
}
bootstrap();

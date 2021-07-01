import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './components/app/app.module';

const { version } = require('../package.json');
const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Onix sports swagger')
    .setDescription('Onix sports API')
    .setVersion(version)
    .addTag('Onix Sports')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT as string);

  console.log('Server is listening on port:', PORT);
}
bootstrap();

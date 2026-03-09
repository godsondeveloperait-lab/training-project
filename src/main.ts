import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'});
  await app.listen(process.env.PORT ?? 3000);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  console.log('MONGO:', process.env.MONGO_URI);
}
void bootstrap();

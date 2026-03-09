import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductsService } from 'src/products/products.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productsService = app.get(ProductsService);

  await productsService.createProduct({
    name: 'Asus Laptop',
    description: 'laptop product',
    price: 100,
    stock: 10,
    images: ['image1.jpg', 'image2.jpg'],
  });

  console.log('Seed completed');

  await app.close();
}

void bootstrap();

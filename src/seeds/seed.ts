import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  await usersService.createUser({
    name: 'Admin',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin',
  });

  console.log('Seed completed');

  await app.close();
}

bootstrap();
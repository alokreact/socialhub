import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalGuards(new ThrottlerGuard(app.get('THROTTLER:MODULE_OPTIONS'), app.get('ThrottlerStorage'), new Reflector()));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(process.env.REDIS_PORT) ?? 6379,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('Auth service running on http://localhost:3001');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DataTransmissionModule } from './data-transmission.module';

async function bootstrap() {
    //
    const app = await NestFactory.create(DataTransmissionModule);
    await app.listen(3003);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { DataTransportModule } from './data-transport.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(DataTransportModule);
  
  // MQTT microservice
  const microserviceMqtt = app.connectMicroservice<MicroserviceOptions>({
    
    transport: Transport.MQTT,
    options: {
      url: "mqtt://mqtt-broker:1883" // Use the service name as the hostname
    },
  });

  await microserviceMqtt.listen();
  await app.listen(3001);
}

bootstrap();


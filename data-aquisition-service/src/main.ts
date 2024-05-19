import { NestFactory } from '@nestjs/core';
import { DataAquisitionModule } from './data-aquisition.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // creation an Http app to expose the DataAquisitionModule
  const httpApp = await NestFactory.create(DataAquisitionModule);

  // creation a microservice that connects to Kafka (expose it to kafka1:9092)
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    DataAquisitionModule,
    {
      
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka1:9092'],
        },
        consumer: {
          groupId: 'SENSOR_DATA_CONSUMERS_KAFKA',
        },
      },
    }
  );

  await httpApp.listen(3002); // Start HTTP application

  await kafkaApp.listen(); // Start Kafka microservice

  // If you want to wait for both to be ready before proceeding, you can use:
  // await Promise.all([
  //   httpApp.listen(3000),
  //   kafkaApp.listen(() => console.log('Kafka microservice is listening')),
  // ]);
}
bootstrap();

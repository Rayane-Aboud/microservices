import { NestFactory } from '@nestjs/core';
import { DataAquisitionCloudModule } from './data-aquisition-cloud.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/**
 * name : data-aquisition-cloud-service
 * location : cloud
 * Role : receives the data each timestamp from the data-transmission-service then, 
 * it will write it to the mongoDB database
 */

//bootstrap <=> loop at the back of the boot
async function bootstrap() {
  try {
      //create microservice using nestfactory which is the main app (it is not exposted to the outside)
      const app = await NestFactory.createMicroservice<MicroserviceOptions>
      
      //creation of the microservice based on the DataAquisitionCloudModule
      (DataAquisitionCloudModule, 
        {
          //transport mean == NATS
          transport: Transport.NATS,
          options: {
            //specify the servers :
            // see: https://docs.nestjs.com/microservices/nats#overview
            servers: ['nats://nats:4222'],
          },
        }
      );
      //listen to the nats broker with the description above
      await app.listen();
      console.log('Consumer microservice is listening.');
  } catch (error) {
      console.error('Error during microservice initialization:', error);
  }
}

bootstrap();

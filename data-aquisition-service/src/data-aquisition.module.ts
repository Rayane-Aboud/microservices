import { Module } from '@nestjs/common';
import { DataAquisitionController } from './data-aquisition.controller';
import { DataAquisitionService } from './data-aquisition.service';
import { StoreInfluxdbModule } from './store-influxdb/store-influxdb.module';
import { StoreInfluxdbService } from './store-influxdb/store-influxdb.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    StoreInfluxdbModule,
    ClientsModule.register([
      {
        name:'SENSOR_DATA_KAFKA',
        transport: Transport.KAFKA,
        options:{
          client:{
            clientId:'DATA_AQUISITION_SERVICE',// Unique identifier for the Kafka client
            brokers: ['kafka1:9092'],/*kafka:9092*/
            connectionTimeout:5000,
            retry:{
              maxRetryTime: 5000,
              retries: 15,
            }
          },
          producer:{
            allowAutoTopicCreation: true,
            retry: {
              retries: 10,
              multiplier: 2,
            },

            createPartitioner: Partitioners.DefaultPartitioner
          },
          consumer:{
            groupId: 'SENSOR_DATA_CONSUMERS_KAFKA'
          }

          
        }
      }
  ])],
  controllers: [DataAquisitionController],
  providers: [DataAquisitionService,StoreInfluxdbService],
})
export class DataAquisitionModule {}

import { Module } from '@nestjs/common';
import { DataTransportController } from './data-transport.controller';
import { DataTransportService } from './data-transport.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';


@Module({
  imports: [
    ClientsModule.register([
      {
        name:'SENSOR_DATA_KAFKA',
        transport: Transport.KAFKA,
        options:{
          
          

          client:{
            clientId:'DATA_TRANSPORT_SERVICE',// Unique identifier for the Kafka client
            brokers: ['kafka1:9092'],/*kafka:9092*/
            connectionTimeout:20000,
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
            groupId:'SENSOR_DATA_CONSUMERS_KAFKA'
          }

          

        }
      },

      {
        name: 'SENSOR_DATA_MQTT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        }
      },
      
    ]),
    
  
  ],
  controllers: [DataTransportController],
  providers: [DataTransportService],
})
export class DataTransportModule {}

import { Module } from '@nestjs/common';
import { DataAquisitionCloudController } from './data-aquisition-cloud.controller';
import { DataAquisitionCloudService } from './data-aquisition-cloud.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    
    imports:[
      //we register some client modules with names so that we don't rewrite the wole configuration 
      //when using it in a controller
      ClientsModule.register([
      {
        //name the client module
        name: 'SENSOR_DATA_NATS',

        //specify the transport it uses
        transport: Transport.NATS,

        //select options about the client
        options: {
          servers: ['nats://nats:4222'],//broker that the client will connect to
        },
      },]),
    ],
    controllers: [DataAquisitionCloudController],
    providers: [DataAquisitionCloudService],
})
export class DataAquisitionCloudModule {}

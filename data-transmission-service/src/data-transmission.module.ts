import { Module } from '@nestjs/common';
import { DataTransmissionController } from './data-transmission.controller';
import { DataTransmissionService } from './data-transmission.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RetrieveFromInfluxdbService } from './retrieve-from-influxdb/retrieve-from-influxdb.service';
import { RetrieveFromInfluxdbModule } from './retrieve-from-influxdb/retrieve-from-influxdb.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SENSOR_DATA_NATS',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
    RetrieveFromInfluxdbModule,
  ],
  controllers: [DataTransmissionController],
  providers: [DataTransmissionService, RetrieveFromInfluxdbService],
})
export class DataTransmissionModule {}
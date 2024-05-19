import { Controller, Get } from '@nestjs/common';
import { DataAquisitionCloudService } from './data-aquisition-cloud.service';
import { Ctx, EventPattern, NatsContext, Payload } from '@nestjs/microservices';
import { SensorDataDto } from './dto/sensor-data.dto';

@Controller()
export class DataAquisitionCloudController {
  //data aquisition 
  constructor(private readonly dataAquisitionCloudService: DataAquisitionCloudService) {}

  //event pattern calls the function once 
  //it tells the client
  
  @EventPattern('SENSOR_DATA_TOPIC_NATS')
  publishedNat(@Payload() data: SensorDataDto, @Ctx() context: NatsContext) {
    console.log('Received sensor data from NATS:', data);
    this.dataAquisitionCloudService.handleSensorDataPublished(data);//store it to the cloud
  }
}
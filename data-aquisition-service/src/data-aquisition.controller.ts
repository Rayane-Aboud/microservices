import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataAquisitionService } from './data-aquisition.service';
import { EventPattern } from '@nestjs/microservices';
import { SensorDataDto } from './dto/sensor-data.dto';

@Controller()
export class DataAquisitionController {
  constructor(private readonly dataAquisitionService: DataAquisitionService) {}
  // subscribe to the topic 'SENSOR_DATA_TOPIC_KAFKA'
  //calls the function once a data has arrived
  @EventPattern('SENSOR_DATA_TOPIC_KAFKA')
  handleSensorDataPublished(data:SensorDataDto){

    //call the function each event 
    this.dataAquisitionService.handleSensorDataPublished(data);
    
  }

 

  /*
  @Post('test-influxdb')
  testInfluxdb(@Body() data:SensorDataPublishedEvent){
    this.dataAquisitionService.handleSensorDataPublished(data);
  }*/

  

}

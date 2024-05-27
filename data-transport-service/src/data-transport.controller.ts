import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataTransportService } from './data-transport.service';
import { SensorDataDto } from './dto/sensor-data.dto';
import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller()
export class DataTransportController {
  private lastPublishedData: any;

  constructor(private readonly dataTransportService: DataTransportService) {}

  @EventPattern('SENSOR_DATA_TOPIC_MQTT')
  publishMqttData(@Payload() data: SensorDataDto, @Ctx() context: MqttContext) {
    this.lastPublishedData = data;
    console.log("collected data from SENSOR_DATA_TOPIC_MQTT : ",data);
    let sensorData:SensorDataDto 
    this.dataTransportService.publishSensorData(data);
  }

  

  @Post()
  publishHttpData(@Body() sensorData:SensorDataDto){
    this.dataTransportService.publishSensorData(sensorData);
  }

  @Get()
  getTransportServiceState(){
    return {
      lastPublishedData: this.lastPublishedData,
    };
  }
}

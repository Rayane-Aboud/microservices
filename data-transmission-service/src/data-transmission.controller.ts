import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataTransmissionService } from './data-transmission.service';
import { SensorDataDto } from './dto/sensor-data.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RetrieveFromInfluxdbService } from './retrieve-from-influxdb/retrieve-from-influxdb.service';

@Controller()
export class DataTransmissionController {
  constructor(
    private readonly dataTransmissionService: DataTransmissionService,
    private readonly dataRetrievalService: RetrieveFromInfluxdbService,
) {}

// Every 
@Cron(CronExpression.EVERY_10_SECONDS)
async publishDataToNats() {
    const sensorDataLast10Sec = await this.dataRetrievalService.makeQuery();
    console.log('Going to publish ', sensorDataLast10Sec);
    this.dataTransmissionService.publishSensorData(sensorDataLast10Sec);
}

@Post()
publishDataToNatsTest(@Body() sensorData: SensorDataDto) {
    // this.dataTransmissionService.publishSensorData(sensorData);
}

  
}

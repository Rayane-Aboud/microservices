import { Inject, Injectable } from '@nestjs/common';
import { SensorDataDto } from './dto/sensor-data.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class DataTransportService {

  constructor(
    @Inject('SENSOR_DATA_KAFKA') private readonly dataTransportClient : ClientKafka
  ){}

  publishSensorData(sensorData:SensorDataDto){
    const sensorDataString = JSON.stringify(sensorData, null, 2);
    //console.log(sensorDataString);
    
    this.dataTransportClient.emit(
      'SENSOR_DATA_TOPIC_KAFKA',
      sensorDataString
    );

  }
}

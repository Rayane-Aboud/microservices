import { Injectable } from '@nestjs/common';
import { StoreInfluxdbService } from './store-influxdb/store-influxdb.service';
import { SensorDataDto } from './dto/sensor-data.dto';

@Injectable()
export class DataAquisitionService {
  constructor(private readonly storeInfluxdbService: StoreInfluxdbService) {}
  //when the data arrives this funciton is called (DIP)
  handleSensorDataPublished(sensorData: SensorDataDto): void {

    console.log(sensorData);

    //store the data in influxdb after data arrives 
    this.storeInfluxdbService.storeDataInfluxDB(sensorData);

  }
}

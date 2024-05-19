import { StoreInfluxdbService } from './store-influxdb/store-influxdb.service';
import { SensorDataDto } from './dto/sensor-data.dto';
export declare class DataAquisitionService {
    private readonly storeInfluxdbService;
    constructor(storeInfluxdbService: StoreInfluxdbService);
    handleSensorDataPublished(sensorData: SensorDataDto): void;
}

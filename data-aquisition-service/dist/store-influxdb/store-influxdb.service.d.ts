import { SensorDataDto } from 'src/dto/sensor-data.dto';
export declare class StoreInfluxdbService {
    private readonly influx;
    private readonly writeApi;
    constructor();
    storeDataInfluxDB(sensorData: SensorDataDto): Promise<void>;
    closeWriteApi(): Promise<void>;
}

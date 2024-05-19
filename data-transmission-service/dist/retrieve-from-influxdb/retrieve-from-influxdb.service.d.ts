import { SensorDataDto } from 'src/dto/sensor-data.dto';
export declare class RetrieveFromInfluxdbService {
    private readonly influx;
    private readonly queryApi;
    constructor();
    makeQuery(): Promise<SensorDataDto>;
}

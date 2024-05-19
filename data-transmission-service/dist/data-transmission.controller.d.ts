import { DataTransmissionService } from './data-transmission.service';
import { SensorDataDto } from './dto/sensor-data.dto';
import { RetrieveFromInfluxdbService } from './retrieve-from-influxdb/retrieve-from-influxdb.service';
export declare class DataTransmissionController {
    private readonly dataTransmissionService;
    private readonly dataRetrievalService;
    constructor(dataTransmissionService: DataTransmissionService, dataRetrievalService: RetrieveFromInfluxdbService);
    publishDataToNats(): Promise<void>;
    publishDataToNatsTest(sensorData: SensorDataDto): void;
}

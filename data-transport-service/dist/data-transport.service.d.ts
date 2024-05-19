import { SensorDataDto } from './dto/sensor-data.dto';
import { ClientKafka } from '@nestjs/microservices';
export declare class DataTransportService {
    private readonly dataTransportClient;
    constructor(dataTransportClient: ClientKafka);
    publishSensorData(sensorData: SensorDataDto): void;
}

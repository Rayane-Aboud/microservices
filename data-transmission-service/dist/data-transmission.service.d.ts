import { ClientProxy } from '@nestjs/microservices';
import { SensorDataDto } from './dto/sensor-data.dto';
export declare class DataTransmissionService {
    private readonly dataTransportClient;
    constructor(dataTransportClient: ClientProxy);
    publishSensorData(sensorData: SensorDataDto): Promise<void>;
}

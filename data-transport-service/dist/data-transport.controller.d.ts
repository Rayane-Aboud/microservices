import { DataTransportService } from './data-transport.service';
import { SensorDataDto } from './dto/sensor-data.dto';
import { MqttContext } from '@nestjs/microservices';
export declare class DataTransportController {
    private readonly dataTransportService;
    private lastPublishedData;
    constructor(dataTransportService: DataTransportService);
    publishMqttData(data: SensorDataDto, context: MqttContext): void;
    publishHttpData(sensorData: SensorDataDto): void;
    getTransportServiceState(): {
        lastPublishedData: any;
    };
}

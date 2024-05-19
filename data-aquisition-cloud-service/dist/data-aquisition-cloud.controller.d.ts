import { DataAquisitionCloudService } from './data-aquisition-cloud.service';
import { NatsContext } from '@nestjs/microservices';
import { SensorDataDto } from './dto/sensor-data.dto';
export declare class DataAquisitionCloudController {
    private readonly dataAquisitionCloudService;
    constructor(dataAquisitionCloudService: DataAquisitionCloudService);
    publishedNat(data: SensorDataDto, context: NatsContext): void;
}

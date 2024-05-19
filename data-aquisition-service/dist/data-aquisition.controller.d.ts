import { DataAquisitionService } from './data-aquisition.service';
import { SensorDataDto } from './dto/sensor-data.dto';
export declare class DataAquisitionController {
    private readonly dataAquisitionService;
    constructor(dataAquisitionService: DataAquisitionService);
    handleSensorDataPublished(data: SensorDataDto): void;
}

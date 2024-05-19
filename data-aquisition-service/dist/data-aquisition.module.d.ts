import { StoreInfluxdbService } from './store-influxdb/store-influxdb.service';
export declare class DataAquisitionModule {
    private readonly storeInfluxdbService;
    constructor(storeInfluxdbService: StoreInfluxdbService);
    onApplicationShutdown(signal?: string): Promise<void>;
}

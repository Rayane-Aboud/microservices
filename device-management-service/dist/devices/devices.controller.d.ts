import { DevicesService } from "./devices.service";
import { Device } from "./schemas/device.schema";
export declare class DeviceController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    fetchAllDevices(): Promise<Device[]>;
    fetchDeviceById(serialNumber: string): Promise<Device | null>;
    createOrUpdate(deviceData: Partial<Device>): Promise<Device>;
    delete(serialNumber: string): Promise<void>;
}

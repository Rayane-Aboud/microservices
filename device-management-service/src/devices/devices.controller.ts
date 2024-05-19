import { Body, Controller,Delete,Get, Param, Post } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { Device } from "./schemas/device.schema";


@Controller('devices')
export class DeviceController{
    constructor(
        private readonly devicesService: DevicesService
    ){}

    @Get()
    async fetchAllDevices() {
        return await this.devicesService.fetchAllDevices();
    }
    
    @Post()
    async createOrUpdate(@Body() deviceData: Partial<Device>): Promise<Device> {
        const { serialNumber, ...rest } = deviceData;
        console.log(deviceData);
        return this.devicesService.createOrUpdate(serialNumber, rest);
    }

    @Delete(':serialNumber')
    async delete(@Param('serialNumber') serialNumber: string): Promise<void> {
        return this.devicesService.delete(serialNumber);
    }

}
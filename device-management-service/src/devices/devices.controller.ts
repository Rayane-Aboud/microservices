import { Body, Controller,Delete,Get, Param, Patch, Post } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { Device } from "./schemas/device.schema";
import { UpdateCodeSnippetDto } from "./schemas/update-code-snippet.schema";


@Controller('devices')
export class DeviceController{
    constructor(
        private readonly devicesService: DevicesService
    ){}

    @Get()
    async fetchAllDevices() {
        return await this.devicesService.fetchAllDevices();
    }
    
    @Get(':serialNumber')
    async fetchDeviceById(@Param('serialNumber') serialNumber: string): Promise<Device> {
        const sidou = await this.devicesService.fetchDeviceById(serialNumber);
        console.log(sidou);
        return sidou;
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

    @Patch(':serialNumber/code-snippet')
    async updateCodeSnippet(
        @Param('serialNumber') serialNumber: string,
        @Body() updateCodeSnippetDto: UpdateCodeSnippetDto
    ): Promise<Device> {
        return this.devicesService.updateCodeSnippet(serialNumber, updateCodeSnippetDto);
    }


}
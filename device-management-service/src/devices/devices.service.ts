import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateCodeSnippetDto } from './schemas/update-code-snippet.schema';

@Injectable()
export class DevicesService {
    constructor(@InjectModel(Device.name) private deviceModel: Model<Device>){}

    async createOrUpdate(serialNumber: string, data: Partial<Device>): Promise<Device> {
        return this.deviceModel.findOneAndUpdate(
            { serialNumber },
            { $set: data },
            { new: true, upsert: true },
        );
    }
    
    
    
    async delete(serialNumber: string): Promise<void> {
        const result = await this.deviceModel.deleteOne({ serialNumber });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Device not found');
        }
    }

    async fetchAllDevices(): Promise<Device[]> {
        return await this.deviceModel.find().exec(); // Fetch all documents
    }

    async fetchDeviceById(serialNumber: string): Promise<Device | null> {
        return await this.deviceModel.findOne({ serialNumber},); // Fetch a document by ID
    }

    
    async updateCodeSnippet(serialNumber: string, updateCodeSnippetDto: UpdateCodeSnippetDto): Promise<Device> {
        const existingDevice = await this.deviceModel.findOneAndUpdate(
            { serialNumber },
            { $set: { codeSnippet: updateCodeSnippetDto.codeSnippet } },
            { new: true }
        );
        if (!existingDevice) {
            throw new NotFoundException('Device not found');
        }
        return existingDevice;
    }


}
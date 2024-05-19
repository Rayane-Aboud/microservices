import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';

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
    


}
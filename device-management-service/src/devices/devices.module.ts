import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesService } from './devices.service';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceController } from './devices.controller';


@Module({
    imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }])],
    controllers:[DeviceController],
    providers: [DevicesService],
})
export class DevicesModule {}
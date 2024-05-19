import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';

export type DeviceSchema = HydratedDocument<Device>;

@Schema() //now the mongodb collection used
export class Device{
    @Prop({ required: true })
    serialNumber: string;

    @Prop({ required: true })
    locationX:string;

    @Prop({ required: true })
    locationY:string;

    @Prop({ required: true })
    date:string;

    @Prop({ required: true })
    dateType:string;

    @Prop({ required: true })
    dataType:string;

    @Prop({ required: true })
    dataUnit:string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);

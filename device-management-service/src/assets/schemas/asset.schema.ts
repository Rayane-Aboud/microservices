import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Schema as MongooseSchema } from 'mongoose';


export type TreeDocument = HydratedDocument<AssetTree> ;

@Schema()
export class AssetTree {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  children: AssetTree[];
}


export const AssetTreeSchema = SchemaFactory.createForClass(AssetTree);

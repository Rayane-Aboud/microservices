import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetTree, AssetTreeSchema } from './schemas/asset.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: AssetTree.name, schema: AssetTreeSchema }])],
  providers: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}

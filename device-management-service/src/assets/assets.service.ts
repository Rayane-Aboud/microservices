import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssetTree } from './schemas/asset.schema';
import { Model } from 'mongoose';
import { CreateAssetTreeDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(AssetTree.name) private assetTreeModel:Model<AssetTree>){}

  async create(createAssetTreeDto:CreateAssetTreeDto):Promise<AssetTree>{
    const createdDevice = new this.assetTreeModel(createAssetTreeDto);
    return createdDevice.save();
  }



  // Method to get the assets tree
  async getAssetTree(): Promise<AssetTree> {
    return this.assetTreeModel.findOne().exec();
  }


  // Method to modify the assets tree
  async updateAssetsTree(createAssetTreeDto: CreateAssetTreeDto): Promise<AssetTree> {
    // This will either update the first document found or create a new one if none exists
    return this.assetTreeModel.findOneAndUpdate(
      {}, // No filter condition, targeting the first document
      createAssetTreeDto, // Data to update with
      { new: true, upsert: true } // Return the new document, and create if it doesn't exist
    ).exec();
  }
}

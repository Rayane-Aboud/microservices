import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetTree } from 'src/interfaces/asset-tree.interface'; // Import the interface
import { CreateAssetTreeDto } from './dto/create-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  getAssetsTree() {
    return this.assetsService.getAssetTree();
  }

  @Post()
  create (@Body() createAssetTreeDto:CreateAssetTreeDto): Promise<AssetTree>{
      return this.assetsService.create(createAssetTreeDto);
  }

  @Post('update')
  updateAssetsTree(@Body() newTree: AssetTree) { // Use the correct type
    console.log(newTree);
    this.assetsService.updateAssetsTree(newTree);
    return { message: 'Tree updated successfully' };
  }
}
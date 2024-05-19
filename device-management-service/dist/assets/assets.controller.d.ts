import { AssetsService } from './assets.service';
import { AssetTree } from 'src/interfaces/asset-tree.interface';
import { CreateAssetTreeDto } from './dto/create-asset.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    getAssetsTree(): Promise<import("./schemas/asset.schema").AssetTree>;
    create(createAssetTreeDto: CreateAssetTreeDto): Promise<AssetTree>;
    updateAssetsTree(newTree: AssetTree): {
        message: string;
    };
}

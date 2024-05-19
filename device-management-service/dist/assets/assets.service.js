"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const asset_schema_1 = require("./schemas/asset.schema");
const mongoose_2 = require("mongoose");
let AssetsService = class AssetsService {
    constructor(assetTreeModel) {
        this.assetTreeModel = assetTreeModel;
    }
    async create(createAssetTreeDto) {
        const createdDevice = new this.assetTreeModel(createAssetTreeDto);
        return createdDevice.save();
    }
    async getAssetTree() {
        return this.assetTreeModel.findOne().exec();
    }
    async updateAssetsTree(createAssetTreeDto) {
        return this.assetTreeModel.findOneAndUpdate({}, createAssetTreeDto, { new: true, upsert: true }).exec();
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(asset_schema_1.AssetTree.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssetsService);
//# sourceMappingURL=assets.service.js.map
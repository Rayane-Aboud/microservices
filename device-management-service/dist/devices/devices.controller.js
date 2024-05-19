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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
let DeviceController = class DeviceController {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    async fetchAllDevices() {
        return await this.devicesService.fetchAllDevices();
    }
    async createOrUpdate(deviceData) {
        const { serialNumber, ...rest } = deviceData;
        return this.devicesService.createOrUpdate(serialNumber, rest);
    }
    async delete(serialNumber) {
        return this.devicesService.delete(serialNumber);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "fetchAllDevices", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Delete)(':serialNumber'),
    __param(0, (0, common_1.Param)('serialNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "delete", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DeviceController);
//# sourceMappingURL=devices.controller.js.map
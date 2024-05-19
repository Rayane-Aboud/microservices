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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAquisitionController = void 0;
const common_1 = require("@nestjs/common");
const data_aquisition_service_1 = require("./data-aquisition.service");
const microservices_1 = require("@nestjs/microservices");
const sensor_data_dto_1 = require("./dto/sensor-data.dto");
let DataAquisitionController = class DataAquisitionController {
    constructor(dataAquisitionService) {
        this.dataAquisitionService = dataAquisitionService;
    }
    handleSensorDataPublished(data) {
        this.dataAquisitionService.handleSensorDataPublished(data);
    }
};
exports.DataAquisitionController = DataAquisitionController;
__decorate([
    (0, microservices_1.EventPattern)('SENSOR_DATA_TOPIC_KAFKA'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_data_dto_1.SensorDataDto]),
    __metadata("design:returntype", void 0)
], DataAquisitionController.prototype, "handleSensorDataPublished", null);
exports.DataAquisitionController = DataAquisitionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [data_aquisition_service_1.DataAquisitionService])
], DataAquisitionController);
//# sourceMappingURL=data-aquisition.controller.js.map
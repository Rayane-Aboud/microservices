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
exports.DataTransmissionController = void 0;
const common_1 = require("@nestjs/common");
const data_transmission_service_1 = require("./data-transmission.service");
const sensor_data_dto_1 = require("./dto/sensor-data.dto");
const schedule_1 = require("@nestjs/schedule");
const retrieve_from_influxdb_service_1 = require("./retrieve-from-influxdb/retrieve-from-influxdb.service");
let DataTransmissionController = class DataTransmissionController {
    constructor(dataTransmissionService, dataRetrievalService) {
        this.dataTransmissionService = dataTransmissionService;
        this.dataRetrievalService = dataRetrievalService;
    }
    async publishDataToNats() {
        const sensorDataLast10Sec = await this.dataRetrievalService.makeQuery();
        console.log('Going to publish ', sensorDataLast10Sec);
        this.dataTransmissionService.publishSensorData(sensorDataLast10Sec);
    }
    publishDataToNatsTest(sensorData) {
    }
};
exports.DataTransmissionController = DataTransmissionController;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataTransmissionController.prototype, "publishDataToNats", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_data_dto_1.SensorDataDto]),
    __metadata("design:returntype", void 0)
], DataTransmissionController.prototype, "publishDataToNatsTest", null);
exports.DataTransmissionController = DataTransmissionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [data_transmission_service_1.DataTransmissionService,
        retrieve_from_influxdb_service_1.RetrieveFromInfluxdbService])
], DataTransmissionController);
//# sourceMappingURL=data-transmission.controller.js.map
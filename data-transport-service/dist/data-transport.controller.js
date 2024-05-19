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
exports.DataTransportController = void 0;
const common_1 = require("@nestjs/common");
const data_transport_service_1 = require("./data-transport.service");
const sensor_data_dto_1 = require("./dto/sensor-data.dto");
const microservices_1 = require("@nestjs/microservices");
let DataTransportController = class DataTransportController {
    constructor(dataTransportService) {
        this.dataTransportService = dataTransportService;
    }
    publishMqttData(data, context) {
        this.lastPublishedData = data;
        console.log(data);
        this.dataTransportService.publishSensorData(data);
    }
    publishHttpData(sensorData) {
        this.dataTransportService.publishSensorData(sensorData);
    }
    getTransportServiceState() {
        return {
            lastPublishedData: this.lastPublishedData,
        };
    }
};
exports.DataTransportController = DataTransportController;
__decorate([
    (0, microservices_1.EventPattern)('SENSOR_DATA_TOPIC_MQTT'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_data_dto_1.SensorDataDto, microservices_1.MqttContext]),
    __metadata("design:returntype", void 0)
], DataTransportController.prototype, "publishMqttData", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sensor_data_dto_1.SensorDataDto]),
    __metadata("design:returntype", void 0)
], DataTransportController.prototype, "publishHttpData", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataTransportController.prototype, "getTransportServiceState", null);
exports.DataTransportController = DataTransportController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [data_transport_service_1.DataTransportService])
], DataTransportController);
//# sourceMappingURL=data-transport.controller.js.map
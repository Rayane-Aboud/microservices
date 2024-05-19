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
exports.DataTransportService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let DataTransportService = class DataTransportService {
    constructor(dataTransportClient) {
        this.dataTransportClient = dataTransportClient;
    }
    publishSensorData(sensorData) {
        const sensorDataString = JSON.stringify(sensorData, null, 2);
        console.log(sensorDataString);
        this.dataTransportClient.emit('SENSOR_DATA_TOPIC_KAFKA', sensorDataString);
    }
};
exports.DataTransportService = DataTransportService;
exports.DataTransportService = DataTransportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SENSOR_DATA_KAFKA')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], DataTransportService);
//# sourceMappingURL=data-transport.service.js.map
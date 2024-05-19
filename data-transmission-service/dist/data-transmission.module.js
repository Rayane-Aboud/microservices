"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransmissionModule = void 0;
const common_1 = require("@nestjs/common");
const data_transmission_controller_1 = require("./data-transmission.controller");
const data_transmission_service_1 = require("./data-transmission.service");
const microservices_1 = require("@nestjs/microservices");
const retrieve_from_influxdb_service_1 = require("./retrieve-from-influxdb/retrieve-from-influxdb.service");
const retrieve_from_influxdb_module_1 = require("./retrieve-from-influxdb/retrieve-from-influxdb.module");
const schedule_1 = require("@nestjs/schedule");
let DataTransmissionModule = class DataTransmissionModule {
};
exports.DataTransmissionModule = DataTransmissionModule;
exports.DataTransmissionModule = DataTransmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            microservices_1.ClientsModule.register([
                {
                    name: 'SENSOR_DATA_NATS',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        url: 'nats://localhost:4222',
                    },
                },
            ]),
            retrieve_from_influxdb_module_1.RetrieveFromInfluxdbModule,
        ],
        controllers: [data_transmission_controller_1.DataTransmissionController],
        providers: [data_transmission_service_1.DataTransmissionService, retrieve_from_influxdb_service_1.RetrieveFromInfluxdbService],
    })
], DataTransmissionModule);
//# sourceMappingURL=data-transmission.module.js.map
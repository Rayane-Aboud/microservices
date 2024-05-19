"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransportModule = void 0;
const common_1 = require("@nestjs/common");
const data_transport_controller_1 = require("./data-transport.controller");
const data_transport_service_1 = require("./data-transport.service");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let DataTransportModule = class DataTransportModule {
};
exports.DataTransportModule = DataTransportModule;
exports.DataTransportModule = DataTransportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'SENSOR_DATA_KAFKA',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'DATA_TRANSPORT_SERVICE',
                            brokers: ['localhost:9092']
                        },
                        consumer: {
                            groupId: 'SENSOR_DATA_CONSUMERS_KAFKA'
                        }
                    }
                }
            ]),
            config_1.ConfigModule.forRoot()
        ],
        controllers: [data_transport_controller_1.DataTransportController],
        providers: [data_transport_service_1.DataTransportService],
    })
], DataTransportModule);
//# sourceMappingURL=data-transport.module.js.map
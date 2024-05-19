"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const data_aquisition_module_1 = require("./data-aquisition.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const httpApp = await core_1.NestFactory.create(data_aquisition_module_1.DataAquisitionModule);
    const kafkaApp = await core_1.NestFactory.createMicroservice(data_aquisition_module_1.DataAquisitionModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'SENSOR_DATA_CONSUMERS_KAFKA',
            },
        },
    });
    await httpApp.listen(3002);
    await kafkaApp.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map
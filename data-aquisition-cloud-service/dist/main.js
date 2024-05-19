"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const data_aquisition_cloud_module_1 = require("./data-aquisition-cloud.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.createMicroservice(data_aquisition_cloud_module_1.DataAquisitionCloudModule, {
            transport: microservices_1.Transport.NATS,
            options: {
                servers: ['nats://localhost:4222'],
            },
        });
        await app.listen();
        console.log('Consumer microservice is listening.');
    }
    catch (error) {
        console.error('Error during microservice initialization:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
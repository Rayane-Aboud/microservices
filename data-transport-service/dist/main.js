"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const data_transport_module_1 = require("./data-transport.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(data_transport_module_1.DataTransportModule);
    const microserviceMqtt = app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: "mqtt://localhost:1883"
        },
    });
    await microserviceMqtt.listen();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
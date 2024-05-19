"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const data_transmission_module_1 = require("./data-transmission.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(data_transmission_module_1.DataTransmissionModule);
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map
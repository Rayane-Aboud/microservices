"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDataPublishedEvent = void 0;
var SensorType;
(function (SensorType) {
    SensorType["WaterSensor"] = "water-sensor";
    SensorType["ElectricitySensor"] = "electricity-sensor";
    SensorType["GasSensor"] = "gas-sensor";
})(SensorType || (SensorType = {}));
class SensorDataPublishedEvent {
    constructor(id, type, value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
    toString() {
        console.log(JSON.stringify(this));
        return JSON.stringify(this);
    }
}
exports.SensorDataPublishedEvent = SensorDataPublishedEvent;
//# sourceMappingURL=sensor-data-published.event.js.map
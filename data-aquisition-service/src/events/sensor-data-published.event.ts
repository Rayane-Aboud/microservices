import { v4 as UUID } from 'uuid';

enum SensorType {
    WaterSensor = "water-sensor",
    ElectricitySensor = "electricity-sensor",
    GasSensor = "gas-sensor"
}

export class SensorDataPublishedEvent {
    constructor(
        public readonly id: string, // Assuming UUID is a string
        public readonly type: string,
        public readonly value: number
    ) {}

    toString(): string {
        console.log(JSON.stringify(this));
        return JSON.stringify(this);
    }
}
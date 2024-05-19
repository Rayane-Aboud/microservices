export declare class SensorDataPublishedEvent {
    readonly id: string;
    readonly type: string;
    readonly value: number;
    constructor(id: string, type: string, value: number);
    toString(): string;
}

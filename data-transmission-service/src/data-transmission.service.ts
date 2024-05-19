import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SensorDataDto } from './dto/sensor-data.dto';
import { StringCodec } from 'nats';

@Injectable()
export class DataTransmissionService {
    constructor(
        @Inject('SENSOR_DATA_NATS') private readonly dataTransportClient: ClientProxy,
    ) {}

    async publishSensorData(sensorData: SensorDataDto) {
        try {
            //
            const sensorDataString = JSON.stringify(sensorData, null, 2);
            console.log(sensorDataString)
            
            // Using `emit` to publish the message
            this.dataTransportClient.emit('SENSOR_DATA_TOPIC_NATS', sensorData);
            console.log('Sensor data published successfully.');


        } catch (error) {
            console.error('Error publishing sensor data:', error.message);
            // Handle the error as needed
        }
    }
}

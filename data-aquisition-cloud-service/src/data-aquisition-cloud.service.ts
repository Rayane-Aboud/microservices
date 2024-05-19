import { Injectable } from '@nestjs/common';
import { SensorDataDto } from './dto/sensor-data.dto';
import { MongoClient } from 'mongodb';

@Injectable()
export class DataAquisitionCloudService {
    private readonly uri: string;
    private readonly dbName: string;
    private client: MongoClient;

    constructor() {
        this.uri = 'mongodb+srv://username:too_weak@cluster0.vtie42d.mongodb.net/';
        this.dbName = 'test';
        this.client = new MongoClient(this.uri);
        this.connect();
    }

    private async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB Atlas');
        } catch (error) {
            console.error('Error connecting to MongoDB Atlas:', error);
        }
    }

    async handleSensorDataPublished(sensorData: SensorDataDto): Promise<void> {
        try {
            console.log('Received sensor data:', sensorData);
            const database = this.client.db(this.dbName);
            const collection = database.collection('datas');
            await collection.insertOne(sensorData);
            console.log('Sensor data saved to MongoDB Atlas');
        } catch (error) {
            console.error('Error handling sensor data:', error.message);
            // Handle the error as needed
        }
    }
}
import { Injectable } from '@nestjs/common';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { DataType, DataUnit, SensorDataDto } from 'src/dto/sensor-data.dto';

@Injectable()
export class StoreInfluxdbService {
    private readonly influx: InfluxDB;
    private readonly writeApi: WriteApi;

    constructor(){
        //configure influx
        this.influx = new InfluxDB({ url: 'http://influxdb:8086', token: '4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w=='});/*influx-db*/
        //configure writeApi to write in the specific placement in influx
        this.writeApi = this.influx.getWriteApi('Namla', 'namla-smart-metering', 's');
    }

    async storeDataInfluxDB(sensorData: SensorDataDto): Promise<void> {
        try {
            // Validate sensorData.value
            if (sensorData.value === '') {
                //throw new Error(`Invalid value: ${sensorData.value}`);
                sensorData.value = '0';
            }

            // Log the data being inserted
            console.log('Inserting data into InfluxDB:', sensorData);

            // Create a point
            const point = new Point('sensor_data')
                .tag('serialNumber', sensorData.serialNumber.toString())
                .timestamp(new Date())
                .tag('dataType', DataType[sensorData.dataType])
                .tag('dataUnit', DataUnit[sensorData.dataUnit])
                .floatField('value', parseFloat(sensorData.value));

            // Write the point
            this.writeApi.writePoint(point);
            await this.writeApi.flush(true);
            console.log('WRITE FINISHED');
        } catch (error) {
            console.error('Error storing data in InfluxDB:', error);
            // Optionally, rethrow the error if you need to handle it upstream
            throw error;
        }
    }

}
    

  




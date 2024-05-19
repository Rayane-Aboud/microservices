import { Injectable } from '@nestjs/common';
import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';
import { SensorDataDto } from 'src/dto/sensor-data.dto';
import { Location } from 'src/dto/sensor-data.dto';
@Injectable()
export class RetrieveFromInfluxdbService {
    private readonly influx: InfluxDB;
    private readonly queryApi: QueryApi;

    constructor() {
        this.influx = new InfluxDB({ url: 'http://influxdb:8086', token: '4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w==' });
        this.queryApi = this.influx.getQueryApi('Namla');                 
    }

    async makeQuery(): Promise<SensorDataDto>  {
        const query = `
        from(bucket: "namla-smart-metering")
        |> range(start: -5s)
        |> filter(fn: (r) => r["_measurement"] == "sensor_data")
        |> filter(fn: (r) => r["dataType"] == "GAS")
        |> filter(fn: (r) => r["serialNumber"] == "1")
        |> filter(fn: (r) => r["dateType"] == "DATE_TIME")
        |> group(columns: ["_measurement", "_field", "dataType", "dateType", "serialNumber"])
        |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
        |> yield(name: "mean")
        `;
        
        try {
            const result = [];
            await this.queryApi.collectRows(query).then((rows) => {
              result.push(...rows);
              console.log(rows)
            });

            for (let i = 0; i< result.length; i++) {
                const location = new Location(52,45);
                if(result[i]['datatype']==='GAS' || result[i]['datatype']==='WATER'){
                    result[i]['dataUnit'] = 'CUBIC_Meters'
                }
                else {
                    result[i]['dataUnit'] = 'KWH'
                }
                const sensorDataDto = new SensorDataDto(
                    result[i]['serialNumber'],
                    location,
                    result[i]['date'],
                    result[i]['dateType'],
                    result[i]['dataType'],
                    result[i]['dataUnit'],
                    result[i]['_value']
                );
                return sensorDataDto;
            }
            // Create a Location object from the location JSON string
            //const locationJsonString:string = result['location'];
            //const locationObject = JSON.parse(locationJsonString);
            //const location = new Location(52,45);
            // Create a SensorDataDto object
            //console.log(result)
            
            

        } catch (error) {
            console.error('Error executing InfluxDB query:', error.message || error);
            throw error; // Re-throw the error to propagate it up if needed
        }

    }
}

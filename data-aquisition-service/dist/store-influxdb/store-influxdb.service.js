"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInfluxdbService = void 0;
const common_1 = require("@nestjs/common");
const influxdb_client_1 = require("@influxdata/influxdb-client");
const sensor_data_dto_1 = require("../dto/sensor-data.dto");
let StoreInfluxdbService = class StoreInfluxdbService {
    constructor() {
        this.influx = new influxdb_client_1.InfluxDB({ url: 'http://localhost:8086', token: 'vNTjOwQRcKN0wkfNiWMfoT_CdQjtL4fJAKNK7pZAGjR6p9I7t-0zPg4L3gywyFxTVkmVn392YtViXcWakwaVsw==' });
        this.writeApi = this.influx.getWriteApi('Namla', 'namla-smart-metering', 's');
    }
    async storeDataInfluxDB(sensorData) {
        try {
            console.log('Inserting data into InfluxDB:', sensorData);
            const point = new influxdb_client_1.Point('sensor_data')
                .stringField('serialNumber', sensorData.serialNumber.toString())
                .stringField('location', JSON.stringify(sensorData.location))
                .stringField('date', sensorData.date.toString())
                .stringField('dateType', sensor_data_dto_1.DateType[sensorData.dateType])
                .stringField('dataType', sensor_data_dto_1.DataType[sensorData.dataType])
                .stringField('dataUnit', sensor_data_dto_1.DataUnit[sensorData.dataUnit])
                .floatField('value', sensorData.value);
            this.writeApi.writePoint(point);
            console.log('WRITE FINISHED');
        }
        catch (error) {
            console.error('Error storing data in InfluxDB:', error);
            throw error;
        }
    }
    async closeWriteApi() {
        await this.writeApi.close();
        console.log('WRITE API CLOSED');
    }
};
exports.StoreInfluxdbService = StoreInfluxdbService;
exports.StoreInfluxdbService = StoreInfluxdbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StoreInfluxdbService);
//# sourceMappingURL=store-influxdb.service.js.map
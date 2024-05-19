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
exports.RetrieveFromInfluxdbService = void 0;
const common_1 = require("@nestjs/common");
const influxdb_client_1 = require("@influxdata/influxdb-client");
const sensor_data_dto_1 = require("../dto/sensor-data.dto");
const sensor_data_dto_2 = require("../dto/sensor-data.dto");
let RetrieveFromInfluxdbService = class RetrieveFromInfluxdbService {
    constructor() {
        this.influx = new influxdb_client_1.InfluxDB({ url: 'http://localhost:8086', token: 'vNTjOwQRcKN0wkfNiWMfoT_CdQjtL4fJAKNK7pZAGjR6p9I7t-0zPg4L3gywyFxTVkmVn392YtViXcWakwaVsw==' });
        this.queryApi = this.influx.getQueryApi('Namla');
    }
    async makeQuery() {
        const query = `
            from(bucket: "namla-smart-metering")
            |> range(start: 0)
            |> last()
            |> limit(n: 10)
            |> filter(fn: (r) => r["_measurement"] == "sensor_data")
        `;
        try {
            const jsonData = {};
            for await (const { values, tableMeta } of this.queryApi.iterateRows(query)) {
                const { _value, _field } = tableMeta.toObject(values);
                jsonData[_field] = _value;
            }
            const locationJsonString = jsonData['location'];
            const locationObject = JSON.parse(locationJsonString);
            const location = new sensor_data_dto_2.Location(locationObject.latitude, locationObject.longtitude);
            const sensorDataDto = new sensor_data_dto_1.SensorDataDto(jsonData['serialNumber'], location, jsonData['date'], jsonData['dateType'], jsonData['dataType'], jsonData['dataUnit'], jsonData['value']);
            return sensorDataDto;
        }
        catch (error) {
            console.error('Error executing InfluxDB query:', error.message || error);
            throw error;
        }
    }
};
exports.RetrieveFromInfluxdbService = RetrieveFromInfluxdbService;
exports.RetrieveFromInfluxdbService = RetrieveFromInfluxdbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RetrieveFromInfluxdbService);
//# sourceMappingURL=retrieve-from-influxdb.service.js.map
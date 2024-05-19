"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDataDto = void 0;
class Location {
    constructor(latitude, longitude, altitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
    toString() {
        return `Location {
            latitude: ${this.latitude},
            longitude: ${this.longitude},
            altitude: ${this.altitude ?? 'N/A'}
        }`;
    }
}
var DateType;
(function (DateType) {
    DateType[DateType["DATE"] = 0] = "DATE";
    DateType[DateType["TIME"] = 1] = "TIME";
    DateType[DateType["DATE_TIME"] = 2] = "DATE_TIME";
    DateType[DateType["TIME_SPAN"] = 3] = "TIME_SPAN";
    DateType[DateType["TIME_ZONE"] = 4] = "TIME_ZONE";
    DateType[DateType["INSTANT"] = 5] = "INSTANT";
    DateType[DateType["INTERVAL"] = 6] = "INTERVAL";
    DateType[DateType["CALENDAR"] = 7] = "CALENDAR";
    DateType[DateType["LOCAL_DATE"] = 8] = "LOCAL_DATE";
    DateType[DateType["LOCAL_TIME"] = 9] = "LOCAL_TIME";
    DateType[DateType["YEAR_MONTH"] = 10] = "YEAR_MONTH";
    DateType[DateType["DATE_TIME_OFFSET"] = 11] = "DATE_TIME_OFFSET";
    DateType[DateType["EPOCH_TIME"] = 12] = "EPOCH_TIME";
    DateType[DateType["JULIAN_DATE"] = 13] = "JULIAN_DATE";
    DateType[DateType["ISO_8601"] = 14] = "ISO_8601";
    DateType[DateType["RATA_DIE"] = 15] = "RATA_DIE";
    DateType[DateType["GPS_TIME"] = 16] = "GPS_TIME";
    DateType[DateType["MODIFIED_JULIAN_DATE"] = 17] = "MODIFIED_JULIAN_DATE";
    DateType[DateType["HINDU_ARABIC_NUMERALS"] = 18] = "HINDU_ARABIC_NUMERALS";
    DateType[DateType["HUMAN_READABLE_RELATIVE_TIME"] = 19] = "HUMAN_READABLE_RELATIVE_TIME";
})(DateType || (DateType = {}));
var DataType;
(function (DataType) {
    DataType[DataType["WATER"] = 0] = "WATER";
    DataType[DataType["GAZ"] = 1] = "GAZ";
    DataType[DataType["ELECTRICITY"] = 2] = "ELECTRICITY";
    DataType[DataType["ENERGY"] = 3] = "ENERGY";
    DataType[DataType["TEMPERATURE"] = 4] = "TEMPERATURE";
    DataType[DataType["AIR_HUMIDITY"] = 5] = "AIR_HUMIDITY";
    DataType[DataType["LUMINOSITY"] = 6] = "LUMINOSITY";
    DataType[DataType["CO2"] = 7] = "CO2";
    DataType[DataType["PIR"] = 8] = "PIR";
})(DataType || (DataType = {}));
var DataUnit;
(function (DataUnit) {
    DataUnit[DataUnit["LITER"] = 0] = "LITER";
    DataUnit[DataUnit["MILLILITER"] = 1] = "MILLILITER";
    DataUnit[DataUnit["CUBIC_METER"] = 2] = "CUBIC_METER";
    DataUnit[DataUnit["GALLON"] = 3] = "GALLON";
    DataUnit[DataUnit["CUBIC_FOOT"] = 4] = "CUBIC_FOOT";
    DataUnit[DataUnit["KILOWATT_HOUR"] = 5] = "KILOWATT_HOUR";
    DataUnit[DataUnit["WATT_HOUR"] = 6] = "WATT_HOUR";
    DataUnit[DataUnit["DEGREE_CELSIUS"] = 7] = "DEGREE_CELSIUS";
    DataUnit[DataUnit["DEGREE_FAHRENHEIT"] = 8] = "DEGREE_FAHRENHEIT";
    DataUnit[DataUnit["PERCENT"] = 9] = "PERCENT";
    DataUnit[DataUnit["LUX"] = 10] = "LUX";
    DataUnit[DataUnit["PPM"] = 11] = "PPM";
    DataUnit[DataUnit["COUNT"] = 12] = "COUNT";
})(DataUnit || (DataUnit = {}));
class SensorDataDto {
    constructor(serialNumber, location, date, dateType, dataType, dataUnit, value) {
        this.serialNumber = serialNumber;
        this.location = location;
        this.date = date;
        this.dateType = dateType;
        this.dataType = dataType;
        this.dataUnit = dataUnit;
        this.value = value;
    }
    toString() {
        return `SensorDataDto {
            serialNumber: ${this.serialNumber},
            location: ${this.location.toString()},
            date: ${this.date},
            dateType: ${this.dateType},
            dataType: ${this.dataType},
            dataUnit: ${this.dataUnit},
            value: ${this.value}
        }`;
    }
}
exports.SensorDataDto = SensorDataDto;
//# sourceMappingURL=sensor-data.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDataDto = exports.DataUnit = exports.DataType = exports.DateType = exports.Location = void 0;
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
exports.Location = Location;
var DateType;
(function (DateType) {
    DateType["DATE"] = "DATE";
    DateType["TIME"] = "TIME";
    DateType["DATE_TIME"] = "DATE_TIME";
    DateType["TIME_SPAN"] = "TIME_SPAN";
    DateType["TIME_ZONE"] = "TIME_ZONE";
    DateType["INSTANT"] = "INSTANT";
    DateType["INTERVAL"] = "INTERVAL";
    DateType["CALENDAR"] = "CALENDAR";
    DateType["LOCAL_DATE"] = "LOCAL_DATE";
    DateType["LOCAL_TIME"] = "LOCAL_TIME";
    DateType["YEAR_MONTH"] = "YEAR_MONTH";
    DateType["DATE_TIME_OFFSET"] = "DATE_TIME_OFFSET";
    DateType["EPOCH_TIME"] = "EPOCH_TIME";
    DateType["JULIAN_DATE"] = "JULIAN_DATE";
    DateType["ISO_8601"] = "ISO_8601";
    DateType["RATA_DIE"] = "RATA_DIE";
    DateType["GPS_TIME"] = "GPS_TIME";
    DateType["MODIFIED_JULIAN_DATE"] = "MODIFIED_JULIAN_DATE";
    DateType["HINDU_ARABIC_NUMERALS"] = "HINDU_ARABIC_NUMERALS";
    DateType["HUMAN_READABLE_RELATIVE_TIME"] = "HUMAN_READABLE_RELATIVE_TIME";
})(DateType || (exports.DateType = DateType = {}));
var DataType;
(function (DataType) {
    DataType["WATER"] = "WATER";
    DataType["GAZ"] = "GAZ";
    DataType["ELECTRICITY"] = "ELECTRICITY";
    DataType["ENERGY"] = "ENERGY";
    DataType["TEMPERATURE"] = "TEMPERATURE";
    DataType["AIR_HUMIDITY"] = "AIR_HUMIDITY";
    DataType["LUMINOSITY"] = "LUMINOSITY";
    DataType["CO2"] = "CO2";
    DataType["PIR"] = "PIR";
})(DataType || (exports.DataType = DataType = {}));
var DataUnit;
(function (DataUnit) {
    DataUnit["LITER"] = "LITER";
    DataUnit["MILLILITER"] = "MILLILITER";
    DataUnit["CUBIC_METER"] = "CUBIC_METER";
    DataUnit["GALLON"] = "GALLON";
    DataUnit["CUBIC_FOOT"] = "CUBIC_FOOT";
    DataUnit["KILOWATT_HOUR"] = "KILOWATT_HOUR";
    DataUnit["WATT_HOUR"] = "WATT_HOUR";
    DataUnit["DEGREE_CELSIUS"] = "DEGREE_CELSIUS";
    DataUnit["DEGREE_FAHRENHEIT"] = "DEGREE_FAHRENHEIT";
    DataUnit["PERCENT"] = "PERCENT";
    DataUnit["LUX"] = "LUX";
    DataUnit["PPM"] = "PPM";
    DataUnit["COUNT"] = "COUNT";
})(DataUnit || (exports.DataUnit = DataUnit = {}));
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
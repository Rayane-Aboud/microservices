export declare class Location {
    latitude: number;
    longitude: number;
    altitude?: number;
    constructor(latitude: number, longitude: number, altitude?: number);
    toString(): string;
}
export declare enum DateType {
    DATE = "DATE",
    TIME = "TIME",
    DATE_TIME = "DATE_TIME",
    TIME_SPAN = "TIME_SPAN",
    TIME_ZONE = "TIME_ZONE",
    INSTANT = "INSTANT",
    INTERVAL = "INTERVAL",
    CALENDAR = "CALENDAR",
    LOCAL_DATE = "LOCAL_DATE",
    LOCAL_TIME = "LOCAL_TIME",
    YEAR_MONTH = "YEAR_MONTH",
    DATE_TIME_OFFSET = "DATE_TIME_OFFSET",
    EPOCH_TIME = "EPOCH_TIME",
    JULIAN_DATE = "JULIAN_DATE",
    ISO_8601 = "ISO_8601",
    RATA_DIE = "RATA_DIE",
    GPS_TIME = "GPS_TIME",
    MODIFIED_JULIAN_DATE = "MODIFIED_JULIAN_DATE",
    HINDU_ARABIC_NUMERALS = "HINDU_ARABIC_NUMERALS",
    HUMAN_READABLE_RELATIVE_TIME = "HUMAN_READABLE_RELATIVE_TIME"
}
export declare enum DataType {
    WATER = "WATER",
    GAZ = "GAZ",
    ELECTRICITY = "ELECTRICITY",
    ENERGY = "ENERGY",
    TEMPERATURE = "TEMPERATURE",
    AIR_HUMIDITY = "AIR_HUMIDITY",
    LUMINOSITY = "LUMINOSITY",
    CO2 = "CO2",
    PIR = "PIR"
}
export declare enum DataUnit {
    LITER = "LITER",
    MILLILITER = "MILLILITER",
    CUBIC_METER = "CUBIC_METER",
    GALLON = "GALLON",
    CUBIC_FOOT = "CUBIC_FOOT",
    KILOWATT_HOUR = "KILOWATT_HOUR",
    WATT_HOUR = "WATT_HOUR",
    DEGREE_CELSIUS = "DEGREE_CELSIUS",
    DEGREE_FAHRENHEIT = "DEGREE_FAHRENHEIT",
    PERCENT = "PERCENT",
    LUX = "LUX",
    PPM = "PPM",
    COUNT = "COUNT"
}
export declare class SensorDataDto {
    serialNumber: string;
    location: Location;
    date: string;
    dateType: DateType;
    dataType: DataType;
    dataUnit: DataUnit;
    value: number;
    constructor(serialNumber: string, location: Location, date: string, dateType: DateType, dataType: DataType, dataUnit: DataUnit, value: number);
    toString(): string;
}

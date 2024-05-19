declare class Location {
    private latitude;
    private longitude;
    private altitude?;
    constructor(latitude: number, longitude: number, altitude?: number);
    toString(): string;
}
declare enum DateType {
    DATE = 0,
    TIME = 1,
    DATE_TIME = 2,
    TIME_SPAN = 3,
    TIME_ZONE = 4,
    INSTANT = 5,
    INTERVAL = 6,
    CALENDAR = 7,
    LOCAL_DATE = 8,
    LOCAL_TIME = 9,
    YEAR_MONTH = 10,
    DATE_TIME_OFFSET = 11,
    EPOCH_TIME = 12,
    JULIAN_DATE = 13,
    ISO_8601 = 14,
    RATA_DIE = 15,
    GPS_TIME = 16,
    MODIFIED_JULIAN_DATE = 17,
    HINDU_ARABIC_NUMERALS = 18,
    HUMAN_READABLE_RELATIVE_TIME = 19
}
declare enum DataType {
    WATER = 0,
    GAZ = 1,
    ELECTRICITY = 2,
    ENERGY = 3,
    TEMPERATURE = 4,
    AIR_HUMIDITY = 5,
    LUMINOSITY = 6,
    CO2 = 7,
    PIR = 8
}
declare enum DataUnit {
    LITER = 0,
    MILLILITER = 1,
    CUBIC_METER = 2,
    GALLON = 3,
    CUBIC_FOOT = 4,
    KILOWATT_HOUR = 5,
    WATT_HOUR = 6,
    DEGREE_CELSIUS = 7,
    DEGREE_FAHRENHEIT = 8,
    PERCENT = 9,
    LUX = 10,
    PPM = 11,
    COUNT = 12
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
export {};

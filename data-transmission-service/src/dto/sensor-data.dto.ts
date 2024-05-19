export class Location {
    latitude: number;
    longitude: number;
    altitude?: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        
    }

    toString(): string {
        return `Location {
            latitude: ${this.latitude},
            longitude: ${this.longitude},
            altitude: ${this.altitude ?? 'N/A'}
        }`;
    }
}

export enum DateType {
    DATE,
    TIME,
    DATE_TIME,
    TIME_SPAN,
    TIME_ZONE,
    INSTANT,
    INTERVAL,
    CALENDAR,
    LOCAL_DATE,
    LOCAL_TIME,
    YEAR_MONTH,
    DATE_TIME_OFFSET,
    EPOCH_TIME,
    JULIAN_DATE,
    ISO_8601,
    RATA_DIE,
    GPS_TIME,
    MODIFIED_JULIAN_DATE,
    HINDU_ARABIC_NUMERALS,
    HUMAN_READABLE_RELATIVE_TIME
}

export enum DataType {
    WATER = 'WATER',
    GAZ = 'GAS',
    ELECTRICITY = 'NMI',
    ENERGY = 'ENERGY',
    TEMPERATURE = 'TEMPERATURE',
    AIR_HUMIDITY = 'AIR_HUMIDITY',
    LUMINOSITY = 'LUMINOSITY',
    CO2 = 'CO2',
    PIR = 'PIR',
}

export enum DataUnit {
    // For WATER
    LITER,
    MILLILITER,
    CUBIC_METER,
    GALLON,
    
    // For GAZ
    CUBIC_FOOT,
    
    // For ELECTRICITY and ENERGY
    KILOWATT_HOUR,
    WATT_HOUR,
    
    // For TEMPERATURE
    DEGREE_CELSIUS,
    DEGREE_FAHRENHEIT,
    
    // For AIR_HUMIDITY
    PERCENT,
    
    // For LUMINOSITY
    LUX,
    
    // For CO2
    PPM,
    
    // For PIR (motion sensor)
    COUNT
}


export class SensorDataDto {
    serialNumber: string;
    location : Location;
    date: string;
    dateType:DateType;
    dataType:DataType;
    dataUnit:DataUnit;
    value:number;


    constructor(
        serialNumber:string,
        location: Location,
        date: string,
        dateType: DateType,
        dataType: DataType,
        dataUnit: DataUnit,
        value: number
    ) {
        this.serialNumber = serialNumber;
        this.location = location;
        this.date = date;
        this.dateType = dateType;
        this.dataType = dataType;
        this.dataUnit = dataUnit;
        this.value = value;

    }


    toString(): string {
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
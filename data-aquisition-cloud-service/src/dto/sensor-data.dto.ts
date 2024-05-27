class Location {
    private latitude: number;
    private longitude: number;
    private altitude?: number;

    constructor(latitude: number, longitude: number, altitude?: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }

    toString(): string {
        return `Location {
            latitude: ${this.latitude},
            longitude: ${this.longitude},
            altitude: ${this.altitude ?? 'N/A'}
        }`;
    }
}



export enum DataType {
    WATER = 'WATER',
    GAS = 'GAS',
    NMI = 'NMI',
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
    COUNT,

    None
}


export class SensorDataDto {
    serialNumber: string;
    location : Location;
    date: string;
    dataType:DataType;
    dataUnit:DataUnit;
    value:number;


    constructor(
        serialNumber:string,
        location: Location,
        date: string,
        dataType: DataType,
        dataUnit: DataUnit,
        value: number
    ) {
        this.serialNumber = serialNumber;
        this.location = location;
        this.date = date;
        this.dataType = dataType;
        this.dataUnit = dataUnit;
        this.value = value;

    }


    toString(): string {
        return `SensorDataDto {
            serialNumber: ${this.serialNumber},
            location: ${this.location.toString()},
            dataType: ${this.dataType},
            dataUnit: ${this.dataUnit},
            value: ${this.value}
        }`;
    }
}
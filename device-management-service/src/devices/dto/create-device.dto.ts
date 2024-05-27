import { IsString, IsNumber, IsDate, IsISO8601 } from 'class-validator';

export interface CreateDeviceDto {
  
  serialNumber: string;
  
  locationX: string;

  locationY: string;


  dataType: string;

  dataUnit: string;

  codeSnippet : string;
  
}
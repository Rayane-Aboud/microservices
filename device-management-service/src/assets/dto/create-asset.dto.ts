import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class CreateAssetTreeDto {
    @IsString()  // Validates that this is a string
    name: string;
  
    @IsArray()  // Validates that this is an array
    @ValidateNested({ each: true })  // Ensures nested validation for each item in the array
    @Type(() => CreateAssetTreeDto)  // Specifies the class type for transformation
    children: CreateAssetTreeDto[];  // Recursive DTO for children
  }
  
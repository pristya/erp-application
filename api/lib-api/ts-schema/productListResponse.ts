import { product } from '../ts-model/table/product'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class productListResponse {
  @IsNotEmpty({ message: 'product_list cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => product)
  product_list!: product
}
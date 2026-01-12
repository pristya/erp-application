import { paymentMethod } from '../ts-model/table/paymentMethod'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class paymentResponse {
  @IsNotEmpty({ message: 'paymentMethod cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => paymentMethod)
  paymentMethod!: paymentMethod
}
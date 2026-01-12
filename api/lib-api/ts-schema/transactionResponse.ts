import { transaction } from '../ts-model/table/transaction'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class transactionResponse {
  @IsNotEmpty({ message: 'transaction cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => transaction)
  transaction!: transaction
}
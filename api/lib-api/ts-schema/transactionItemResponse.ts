import { transactionItem } from '../ts-model/table/transactionItem'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class transactionItemResponse {
  @IsNotEmpty({ message: 'transaction_item cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => transactionItem)
  transaction_item!: transactionItem
}
import { product } from '../../ts-model/table/product'
import { transaction } from '../../ts-model/table/transaction'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class transactionItem {
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'id must be a number (integer)' })
  id!: number
  otm_product_id!: product;
  product_id!: number
  otm_transaction_id!: transaction;
  transaction_id!: number
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'biaya_admin must be a number (integer)' })
  biaya_admin!: number
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'qty must be a number (integer)' })
  qty!: number
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'total must be a number (integer)' })
  total!: number
  @Transform((param?: any): Date | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : new Date(param?.value))
  @IsISO8601({}, { message: 'created_at must be an ISO8601 date' })
  created_at!: Date
}
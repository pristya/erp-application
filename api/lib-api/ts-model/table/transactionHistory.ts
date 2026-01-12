import { transaction } from '../../ts-model/table/transaction'
import { transactionStatus } from '../../ts-model/enum/transactionStatus'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class transactionHistory {
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'id must be a number (integer)' })
  id!: number
  otm_id_transaction!: transaction;
  id_transaction!: number
  @IsEnum(transactionStatus, { message: 'status must be enum transactionStatus' })
  status!: transactionStatus
  @IsString({ message: 'data must be a string' })
  data?: string
  @Transform((param?: any): Date | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : new Date(param?.value))
  @IsISO8601({}, { message: 'created_at must be an ISO8601 date' })
  created_at!: Date
}
import { user } from '../../ts-model/table/user'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class transaction {
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'id must be a number (integer)' })
  id!: number
  otm_user_id!: user;
  user_id!: number
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'total_harga must be a number (integer)' })
  total_harga!: number
  @Transform((param?: any): Date | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : new Date(param?.value))
  @IsISO8601({}, { message: 'created_at must be an ISO8601 date' })
  created_at!: Date
}
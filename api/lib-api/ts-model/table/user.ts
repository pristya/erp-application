import { userRole } from '../../ts-model/enum/userRole'

import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class user {
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseInt(param.value))
  @IsNumber({}, { message: 'id must be a number (integer)' })
  id!: number
  @IsEnum(userRole, { message: 'role must be enum userRole' })
  role!: userRole
  @IsString({ message: 'username must be a string' })
  username!: string
  @IsString({ message: 'password must be a string' })
  password!: string
  @IsString({ message: 'nomor_hp must be a string' })
  nomor_hp!: string
  @IsString({ message: 'nama_lengkap must be a string' })
  nama_lengkap!: string
  @Transform((param?: any): Date | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : new Date(param?.value))
  @IsISO8601({}, { message: 'created_at must be an ISO8601 date' })
  created_at!: Date
}
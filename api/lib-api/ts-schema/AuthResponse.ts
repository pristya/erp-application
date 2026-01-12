
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class AuthResponse {
  @IsNotEmpty({ message: 'token cannot be empty' })
  @IsString({ message: 'token must be a string' })
  token!: string
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username must be a string' })
  username!: string
  @IsNotEmpty({ message: 'nama_lengkap cannot be empty' })
  @IsString({ message: 'nama_lengkap must be a string' })
  nama_lengkap!: string
  @IsNotEmpty({ message: 'role cannot be empty' })
  @IsString({ message: 'role must be a string' })
  role!: string
}
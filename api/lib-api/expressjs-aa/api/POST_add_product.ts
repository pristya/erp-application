import { product } from '../../ts-model/table/product'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class POST_add_product_Req_Headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class POST_add_product_Req_Body {
  @IsNotEmpty({ message: 'img cannot be empty' })
  @IsString({ message: 'img must be a string' })
  img!: string
  @IsNotEmpty({ message: 'nama cannot be empty' })
  @IsString({ message: 'nama must be a string' })
  nama!: string
  @IsNotEmpty({ message: 'deskripsi cannot be empty' })
  @IsString({ message: 'deskripsi must be a string' })
  deskripsi!: string
  @IsNotEmpty({ message: 'unit cannot be empty' })
  @IsString({ message: 'unit must be a string' })
  unit!: string
  @IsNotEmpty({ message: 'harga cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'harga must be a number (decimal)' })
  harga!: number
  @IsNotEmpty({ message: 'stok cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'stok must be a number (decimal)' })
  stok!: number
}

export class POST_add_product_Req {
  @Type(() => POST_add_product_Req_Headers)
  headers!: POST_add_product_Req_Headers
  @Type(() => POST_add_product_Req_Body)
  body!: POST_add_product_Req_Body
}
export interface POST_add_product {
  endpoint: 'POST /add-product'
  fn: (param: POST_add_product_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<product>
}

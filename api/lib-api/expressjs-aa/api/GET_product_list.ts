import { product } from '../../ts-model/table/product'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class GET_product_list_Req_Query {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'limit must be a number (decimal)' })
  limit?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'offset must be a number (decimal)' })
  offset?: number
  @IsOptional()
  @IsString({ message: 'search must be a string' })
  search?: string
}

export class GET_product_list_Req {
  @Type(() => GET_product_list_Req_Query)
  query!: GET_product_list_Req_Query
}
export interface GET_product_list {
  endpoint: 'GET /product-list'
  fn: (param: GET_product_list_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<product[]>
}

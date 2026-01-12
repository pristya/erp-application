import { transactionItem } from '../../ts-model/table/transactionItem'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class GET_transaction_list_Req_Query {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'limit must be a number (decimal)' })
  limit?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'offset must be a number (decimal)' })
  offset?: number
}
class GET_transaction_list_Req_Headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export class GET_transaction_list_Req {
  @Type(() => GET_transaction_list_Req_Query)
  query!: GET_transaction_list_Req_Query
  @Type(() => GET_transaction_list_Req_Headers)
  headers!: GET_transaction_list_Req_Headers
}
export interface GET_transaction_list {
  endpoint: 'GET /transaction-list'
  fn: (param: GET_transaction_list_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<transactionItem[]>
}

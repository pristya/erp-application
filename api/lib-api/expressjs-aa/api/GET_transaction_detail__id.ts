import { transactionItem } from '../../ts-model/table/transactionItem'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class GET_transaction_detail__id_Req_Paths {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
class GET_transaction_detail__id_Req_Headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export class GET_transaction_detail__id_Req {
  @Type(() => GET_transaction_detail__id_Req_Paths)
  paths!: GET_transaction_detail__id_Req_Paths
  @Type(() => GET_transaction_detail__id_Req_Headers)
  headers!: GET_transaction_detail__id_Req_Headers
}
export interface GET_transaction_detail__id {
  endpoint: 'GET /transaction-detail/:id'
  fn: (param: GET_transaction_detail__id_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<transactionItem[]>
}

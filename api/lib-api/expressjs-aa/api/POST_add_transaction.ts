import { transactionItem } from '../../ts-model/table/transactionItem'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class POST_add_transaction_Req_Headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class POST_add_transaction_Req_Body {
  @IsNotEmpty({ message: 'product_id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'product_id must be a number (decimal)' })
  product_id!: number
  @IsNotEmpty({ message: 'qty cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'qty must be a number (decimal)' })
  qty!: number
}

export class POST_add_transaction_Req {
  @Type(() => POST_add_transaction_Req_Headers)
  headers!: POST_add_transaction_Req_Headers
  @Type(() => POST_add_transaction_Req_Body)
  body!: POST_add_transaction_Req_Body
}
export interface POST_add_transaction {
  endpoint: 'POST /add-transaction'
  fn: (param: POST_add_transaction_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<transactionItem[]>
}

import { productPayload } from '../../ts-schema/productPayload'
import { transaction } from '../../ts-model/table/transaction'
import { Utility } from '../Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

class POST_transaction_item_Req_Headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
class POST_transaction_item_Req_Body {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productPayload)
  product?: productPayload[]
  @IsNotEmpty({ message: 'bukti_pembayaran cannot be empty' })
  @IsString({ message: 'bukti_pembayaran must be a string' })
  bukti_pembayaran!: string
}

export class POST_transaction_item_Req {
  @Type(() => POST_transaction_item_Req_Headers)
  headers!: POST_transaction_item_Req_Headers
  @Type(() => POST_transaction_item_Req_Body)
  body!: POST_transaction_item_Req_Body
}
export interface POST_transaction_item {
  endpoint: 'POST /transaction-item'
  fn: (param: POST_transaction_item_Req, Error: (param: Utility.ErrorParam<string>) => Utility.ErrorParam<string>) => Promise<transaction[]>
}

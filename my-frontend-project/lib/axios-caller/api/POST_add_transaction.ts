class POST_add_transaction_Req_Headers {
  authorization!: string
}
class POST_add_transaction_Req_Body {
  product_id!: number
  qty!: number
}

export class POST_add_transaction_Req {
  headers!: POST_add_transaction_Req_Headers
  body!: POST_add_transaction_Req_Body
}

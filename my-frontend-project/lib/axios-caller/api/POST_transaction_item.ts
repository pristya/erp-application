class POST_transaction_item_Req_Body {
  product_id!: number
  nama!: string
  qty!: number
  harga!: number
  total!: number
  ongkir!: number
  biaya_admin!: number
}

export class POST_transaction_item_Req {
  body!: POST_transaction_item_Req_Body
}

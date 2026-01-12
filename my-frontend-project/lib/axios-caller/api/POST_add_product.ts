class POST_add_product_Req_Headers {
  authorization!: string
}
class POST_add_product_Req_Body {
  img!: string
  nama!: string
  deskripsi!: string
  unit!: string
  harga!: number
  stok!: number
}

export class POST_add_product_Req {
  headers!: POST_add_product_Req_Headers
  body!: POST_add_product_Req_Body
}

class PUT_update_product__id_Req_Paths {
  id!: number
}
class PUT_update_product__id_Req_Headers {
  authorization!: string
}
class PUT_update_product__id_Req_Body {
  img!: string
  nama!: string
  deskripsi!: string
  unit!: string
  harga!: number
  stok!: number
}

export class PUT_update_product__id_Req {
  paths!: PUT_update_product__id_Req_Paths
  headers!: PUT_update_product__id_Req_Headers
  body!: PUT_update_product__id_Req_Body
}

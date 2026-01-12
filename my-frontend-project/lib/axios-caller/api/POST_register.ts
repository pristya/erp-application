class POST_register_Req_Body {
  username!: string
  password!: string
  nama_lengkap!: string
  nomor_hp!: string
}

export class POST_register_Req {
  body!: POST_register_Req_Body
}

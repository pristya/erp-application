class GET_product_list_Req_Query {
  limit?: number
  offset?: number
  search?: string
}

export class GET_product_list_Req {
  query!: GET_product_list_Req_Query
}

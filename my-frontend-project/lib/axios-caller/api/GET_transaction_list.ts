class GET_transaction_list_Req_Query {
  limit?: number
  offset?: number
}
class GET_transaction_list_Req_Headers {
  authorization!: string
}

export class GET_transaction_list_Req {
  query!: GET_transaction_list_Req_Query
  headers!: GET_transaction_list_Req_Headers
}

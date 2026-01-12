import { product } from '../../ts-model/table/product'
import { transaction } from '../../ts-model/table/transaction'

export class transactionItem {
  id!: number
  otm_product_id!: product;
  product_id!: number
  otm_transaction_id!: transaction;
  transaction_id!: number
  biaya_admin!: number
  qty!: number
  total!: number
  created_at!: Date
}
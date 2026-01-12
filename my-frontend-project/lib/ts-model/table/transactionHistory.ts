import { transaction } from '../../ts-model/table/transaction'
import { transactionStatus } from '../../ts-model/enum/transactionStatus'

export class transactionHistory {
  id!: number
  otm_id_transaction!: transaction;
  id_transaction!: number
  status!: transactionStatus
  data?: string
  created_at!: Date
}
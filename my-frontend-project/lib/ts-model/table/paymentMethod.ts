import { paymentMethodTypes } from '../../ts-model/enum/paymentMethodTypes'

export class paymentMethod {
  id!: number
  nama!: string
  jenis?: paymentMethodTypes
  kode!: string
  created_at!: Date
}
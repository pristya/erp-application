import { user } from '../../ts-model/table/user'

export class cartItem {
  id!: number
  otm_id_user!: user;
  id_user!: number
  qty!: number
  created_at!: Date
}
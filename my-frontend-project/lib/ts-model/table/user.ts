import { userRole } from '../../ts-model/enum/userRole'

export class user {
  id!: number
  role!: userRole
  username!: string
  password!: string
  nomor_hp!: string
  nama_lengkap!: string
  created_at!: Date
}
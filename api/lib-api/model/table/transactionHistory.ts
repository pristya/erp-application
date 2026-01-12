import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { transaction } from '../../model/table/transaction'
import { transactionStatus } from '../../model/enum/transactionStatus'

@Entity('transactionHistory')
export class transactionHistory extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => transaction, x => x.id, { nullable: false })
  @JoinColumn({ name: 'id_transaction' })
  otm_id_transaction!: transaction;
  @Column({
    name: 'id_transaction',
    type: 'bigint',
    nullable: false,
  })
  id_transaction!: number;
  @Column({
    type: 'enum',
    enum: transactionStatus,
    nullable: false,
    default: 'Baru',
  })
  status!: transactionStatus;
  @Column({
    type: 'text',
    nullable: true,
  })
  data?: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { product } from '../../model/table/product'
import { transaction } from '../../model/table/transaction'

@Entity('transactionItem')
export class transactionItem extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => product, x => x.id, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  otm_product_id!: product;
  @Column({
    name: 'product_id',
    type: 'bigint',
    nullable: false,
  })
  product_id!: number;
  @ManyToOne(() => transaction, x => x.id, { nullable: false })
  @JoinColumn({ name: 'transaction_id' })
  otm_transaction_id!: transaction;
  @Column({
    name: 'transaction_id',
    type: 'bigint',
    nullable: false,
  })
  transaction_id!: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  biaya_admin!: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  qty!: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  total!: number;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { paymentMethodTypes } from '../../model/enum/paymentMethodTypes'

@Entity('paymentMethod')
export class paymentMethod extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nama!: string;
  @Column({
    type: 'enum',
    enum: paymentMethodTypes,
    nullable: true,
    default: 'Tunai',
  })
  jenis?: paymentMethodTypes;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  kode!: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
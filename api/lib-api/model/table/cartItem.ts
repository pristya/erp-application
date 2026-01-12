import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { user } from '../../model/table/user'

@Entity('cartItem')
export class cartItem extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => user, x => x.id, { nullable: false })
  @JoinColumn({ name: 'id_user' })
  otm_id_user!: user;
  @Column({
    name: 'id_user',
    type: 'bigint',
    nullable: false,
  })
  id_user!: number;
  @Column({
    type: 'int',
    nullable: false,
  })
  qty!: number;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
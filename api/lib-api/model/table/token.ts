import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { user } from '../../model/table/user'

@Entity('token')
export class token extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => user, x => x.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  otm_user_id!: user;
  @Column({
    name: 'user_id',
    type: 'bigint',
    nullable: false,
  })
  user_id!: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  token!: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  expired_at!: Date;
}
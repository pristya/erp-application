import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { userRole } from '../../model/enum/userRole'

@Entity('user')
export class user extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'enum',
    enum: userRole,
    nullable: false,
  })
  role!: userRole;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  username!: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password!: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  nomor_hp!: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nama_lengkap!: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
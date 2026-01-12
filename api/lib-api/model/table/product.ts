import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('product')
export class product extends BaseEntity {
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
  img!: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nama!: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  deskripsi!: string;
  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  unit!: string;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  harga!: number;
  @Column({
    type: 'bigint',
    nullable: false,
  })
  stok!: number;
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  is_active!: boolean;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_at!: Date;
}
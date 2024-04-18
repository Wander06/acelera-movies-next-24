// FILE: @/app/models/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: "email", type: 'varchar'})
  email?: string;

  @Column({name: "password", type: 'varchar'})
  password?: string;
}
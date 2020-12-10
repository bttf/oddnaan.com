import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
@Unique(["uuid"])
export class Asset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  url!: string;

  // TODO Check if TypeORM creates column as 'createdAt' or 'created_at'
  // Force 'created_at' if needed, e.g. `@Column({ name: 'created_at' })`
  @Column()
  createdAt!: string;

  @OneToOne(() => User)
  @JoinColumn()
  uploader!: User;

  @Column()
  isPrivate!: boolean;
}

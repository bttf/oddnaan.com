import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated("uuid")
  @Index({ unique: true })
  uuid!: string;

  @Column("text")
  @Index()
  name!: string;

  @Column("text")
  @Index()
  url!: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "uploader_id" })
  uploader!: User;

  @Column({ type: "boolean", name: "is_private" })
  @Index()
  isPrivate!: boolean;
}

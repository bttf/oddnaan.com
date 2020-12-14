import {
  Column,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated("uuid")
  @Index({ unique: true })
  uuid!: string;

  @Column("text")
  @Index({ unique: true })
  username!: string;

  @Column("text")
  @Index({ unique: true })
  email!: string;

  @Column("text")
  password!: string;
}

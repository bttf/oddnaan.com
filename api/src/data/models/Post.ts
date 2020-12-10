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
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  title!: string;

  @Column()
  body!: string;

  // TODO Check if TypeORM creates column as 'createdAt' or 'created_at'
  // Force 'created_at' if needed, e.g. `@Column({ name: 'created_at' })`
  @Column()
  createdAt!: string;

  // TODO Check if TypeORM creates column as 'createdAt' or 'created_at'
  // Force 'created_at' if needed, e.g. `@Column({ name: 'created_at' })`
  @Column()
  updatedAt!: string;

  @Column()
  isPublished!: boolean;

  @Column()
  bodyFormat!: "markdown" | "jsx" | "html" | "text";

  @OneToOne(() => User)
  @JoinColumn()
  author!: User;
}

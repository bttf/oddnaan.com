import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "./User";

enum BodyFormats {
  MARKDOWN = "markdown",
  JSX = "jsx",
  HTML = "html",
  TEXT = "text",
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Generated("uuid")
  @Index({ unique: true })
  uuid!: string;

  @Column("text")
  title!: string;

  @Column("text")
  body!: string;

  // CreateDateColumn decorator is buggy
  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  @Index()
  createdAt!: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt!: string;

  @Column({ type: "boolean", name: "is_published" })
  @Index()
  isPublished!: boolean;

  @Column({
    name: "body_format",
    type: "enum",
    enum: BodyFormats,
    default: BodyFormats.MARKDOWN,
  })
  bodyFormat!: "markdown" | "jsx" | "html" | "text";

  @ManyToOne(() => User)
  @JoinColumn({ name: "author_id" })
  author!: User;
}

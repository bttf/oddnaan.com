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

  @OneToOne(() => User)
  @JoinColumn({ name: "author_id" })
  author!: User;
}

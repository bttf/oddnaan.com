import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["uuid"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}

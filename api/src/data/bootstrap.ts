import "reflect-metadata";
import { Asset } from "./models/Asset";
import { Post } from "./models/Post";
import { User } from "./models/User";
import { createConnection } from "typeorm";

const {
  ODDNAAN_PGHOST: PGHOST,
  ODDNAAN_PGPORT: PGPORT,
  ODDNAAN_PGUSER: PGUSER,
  ODDNAAN_PGPASSWORD: PGPASSWORD,
  ODDNAAN_PGDATABASE: PGDATABASE,
} = process.env;

createConnection({
  type: "postgres",
  host: PGHOST,
  port: parseInt(PGPORT || "3000"),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  entities: [Asset, Post, User],
  synchronize: true,
});

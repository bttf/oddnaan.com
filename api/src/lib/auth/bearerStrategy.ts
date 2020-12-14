import jwt from "jsonwebtoken";
import { Strategy as BearerStrategy } from "passport-http-bearer";

const AUTH_SECRET = process.env.ODDNAAN_AUTH_SECRET;

if (!AUTH_SECRET) throw new Error("AUTH_SECRET needs to be set");

export default new BearerStrategy((token, done) => {
  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) done(err);
    done(null, decoded);
  });
});

import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import serve from "koa-static";
import passport from "src/lib/auth/passport";
import bearerMiddleware from "src/lib/auth/bearerMiddleware";
import publicServer from "./publicServer";
import privateServer from "./privateServer";

// Bootstrap DB
import "./data/bootstrap";

const PORT = process.env.ODDNAAN_PORT || 3000;
const app = new Koa();
const router = new Router();

app.use(cors());

app.use(router.routes());
app.use(serve(`${__dirname}/../public`));

publicServer.applyMiddleware({ app, path: "/public/graphql" });

app.use(passport.initialize());
app.use(bearerMiddleware);

privateServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => console.log(`Listening on port ${PORT}`));

import { getRepository } from "typeorm";
import { User } from "src/data/models/User";
import passport from "./passport";

const unauthorizedResponse = (ctx: any) => {
  ctx.response.status = 401;
  ctx.response.body = JSON.stringify({
    errors: [{ message: "Unauthorized" }],
  });
};

// TODO Add type definitions to callback args
export default (ctx: any, next: any) => {
  const userRepo = getRepository(User);

  return passport.authenticate("bearer", async (err, decodedUser) => {
    if (err || !decodedUser || !decodedUser.user) {
      unauthorizedResponse(ctx);
    } else {
      const userId = decodedUser.user.id;
      const user = await userRepo.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        unauthorizedResponse(ctx);
      } else {
        ctx.req.user = user;
        await next();
      }
    }
  })(ctx, next);
};

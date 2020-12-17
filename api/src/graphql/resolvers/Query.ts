import { getRepository } from "typeorm";
import { User as UserModel } from "src/data/models/User";
import { Post as PostModel } from "src/data/models/Post";
import { Asset as AssetModel } from "src/data/models/Asset";

enum AssetsOrderByEnum {
  NAME = "name",
  CREATED_AT = "created_at",
}

export default {
  post(_source: any, args: { uuid: string }, context: any) {
    const { uuid } = args;
    const postRepo = getRepository(PostModel);
    return postRepo.findOne({ where: { uuid } });
  },
  posts(_source: any, _args: any, context: any) {
    const postRepo = getRepository(PostModel);
    return postRepo.find();
  },
  asset(_source: any, args: { uuid: string }, context: any) {
    const { uuid } = args;
    const assetRepo = getRepository(AssetModel);
    return assetRepo.findOne({ where: { uuid } });
  },
  assets(
    _source: any,
    args: { orderBy: AssetsOrderByEnum; query: String },
    context: any
  ) {
    const { query } = args;
    const assetRepo = getRepository(AssetModel);
    const qb = assetRepo.createQueryBuilder("asset");

    if (query) {
      qb.where("asset.name ilike '%:query%' OR asset.url ilike '%:query%'", {
        query,
      });
    }

    return qb.getMany();
  },
  user(_source: any, args: { uuid: string }, context: any) {
    const { uuid } = args;
    const userRepo = getRepository(UserModel);
    return userRepo.findOne({ where: { uuid } });
  },
  users(_source: any, _args: any, context: any) {
    const userRepo = getRepository(UserModel);
    return userRepo.find();
  },
};

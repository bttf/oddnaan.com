import { getRepository } from "typeorm";
import { Asset } from "src/data/models/Asset";

export default async (
  _: any,
  args: { input: { name: string; url: string; isPrivate: boolean } },
  context: any
) => {
  const {
    input: { name, url, isPrivate = true },
  } = args;
  const assetRepo = getRepository(Asset);
  const asset = assetRepo.create({
    name,
    url,
    isPrivate,
    uploader: context.req.user,
  });

  try {
    await assetRepo.save(asset);
  } catch (e) {
    console.error("Asset creation failed");
    return { errors: ["Asset creation failed"] };
  }

  return { createdAsset: asset };
};

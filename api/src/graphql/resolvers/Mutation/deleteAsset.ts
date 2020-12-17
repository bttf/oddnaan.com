import { getRepository } from "typeorm";
import { Asset } from "src/data/models/Asset";

export default async (
  _: any,
  args: { input: { uuid: string } },
  context: any
) => {
  const {
    input: { uuid },
  } = args;
  const assetRepo = getRepository(Asset);

  try {
    await assetRepo.delete({ uuid });
  } catch (e) {
    console.error("Could not delete asset", e);
    return { errors: ["Trouble deleting asset"] };
  }

  return { deletedAsset: { uuid } };
};

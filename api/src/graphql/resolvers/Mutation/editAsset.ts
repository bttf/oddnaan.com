import { getRepository } from "typeorm";
import { Asset } from "../../../data/models/Asset";

export default async (
  _: any,
  args: { uuid: string; name: string; url: string },
  context: any
) => {
  const { uuid, name, url } = args;
  const assetRepo = getRepository(Asset);
  let editedAsset;

  try {
    editedAsset = await assetRepo
      .createQueryBuilder()
      .update(Asset)
      .set({ name, url })
      .where("uuid = :uuid", { uuid })
      .returning(["url", "name"])
      .execute();
  } catch (e) {
    console.error("Could not edit asset", e);
    return { errors: ["Trouble editing asset"] };
  }

  return { editedAsset };
};

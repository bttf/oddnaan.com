import { getRepository } from "typeorm";
import { Asset } from "src/data/models/Asset";
import { FileUpload } from "graphql-upload";

export default async (
  _: any,
  args: { input: { files: Array<Promise<FileUpload>> } },
  context: any
) => {
  const {
    input: { files },
  } = args;

  const _files = await Promise.all(files);
  _files.forEach((file) => {
    const { filename, mimetype, createReadStream } = file;
    console.log("DEBUG file", file);
    console.log(
      "DEBUG filename, mimetype, createReadStream",
      filename,
      mimetype,
      createReadStream
    );
  });

  // Upload to DO Spaces (using s3 sdk)

  // const assetRepo = getRepository(Asset);
  // const asset = assetRepo.create({
  //   isPrivate,
  //   uploader: context.req.user,
  // });

  // try {
  //   await assetRepo.save(asset);
  // } catch (e) {
  //   console.error("Asset creation failed");
  //   return { errors: ["Asset creation failed"] };
  // }

  // return { createdAsset: asset };
  return { createdAsset: null };
};

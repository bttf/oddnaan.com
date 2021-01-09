import { getRepository } from "typeorm";
import { Asset } from "../../../data/models/Asset";
import { FileUpload } from "graphql-upload";
import * as AWS from "aws-sdk";

const ODDNAAN_S3_ENDPOINT = process.env.ODDNAAN_S3_ENDPOINT;
const ODDNAAN_S3_ACCESS_KEY_ID = process.env.ODDNAAN_S3_ACCESS_KEY_ID;
const ODDNAAN_S3_ACCESS_KEY_SECRET = process.env.ODDNAAN_S3_ACCESS_KEY_SECRET;

const endpoint = new AWS.Endpoint(ODDNAAN_S3_ENDPOINT || "");
const s3 = new AWS.S3({
  endpoint,
  accessKeyId: ODDNAAN_S3_ACCESS_KEY_ID,
  secretAccessKey: ODDNAAN_S3_ACCESS_KEY_SECRET,
});

export default async (
  _: any,
  args: { input: { files: Array<Promise<FileUpload>> } },
  // TODO Type context
  context: any
) => {
  const {
    input: { files: _files },
  } = args;

  // See graphql-upload lib
  const files = await Promise.all(_files);

  try {
    const uploadedFiles = await Promise.all(
      files.map((file) => {
        const stream = file.createReadStream();

        const params = {
          Body: stream,
          Bucket: "oddnaan",
          Key: file.filename,
          // TODO Allow this to be configurable
          ACL: "public-read",
        };

        return new Promise((resolve, reject) => {
          s3.upload(params, function (err: Error, data: any) {
            if (err) {
              console.log(err, err.stack);
              reject(err);
            }
            resolve(data);
          });
        });
      })
    );

    const assetRepo = getRepository(Asset);

    const createdAssets = await assetRepo
      .createQueryBuilder()
      .insert()
      .into(Asset)
      .values(
        uploadedFiles.map((f: any) => ({
          name: f.Key,
          url: f.Location,
          uploader: context.req.user,
          // TODO Make configurable in the future
          isPrivate: false,
        }))
      )
      .returning(["name", "url"])
      .execute();

    return {
      createdAssets: createdAssets.raw,
    };
  } catch (e) {
    console.error("A gat damn error occurred", e);
    return { errors: ["Could not do the thing; check the logs"] };
  }
};

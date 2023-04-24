import type { NextApiRequest, NextApiResponse } from "next";

import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const bucketName = process.env.AWS_S3_BUCKET_NAME || "";

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: "default",
});

const s3 = new AWS.S3({ region });

async function uploadImage(file: File) {
  const key = `hdnhd_${new Date()}_${nanoid()}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  };
  const result = await s3.upload(params).promise();
  // Return the URL of the uploaded file
  return result.Location;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method == "POST") {
    const file = req.body?.file;

    if (!file) {
      return res.status(422).send("No file found");
    }

    try {
      const url = await uploadImage(file);
      return res.status(200).json({ url });
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  return res.status(404);
}

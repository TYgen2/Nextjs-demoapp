"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import * as z from "zod";

const generateFileName = (byte = 32) =>
  crypto.randomBytes(byte).toString("hex");

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY || "",
  },
});

const acceptedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
const maxFileSize = 1024 * 1024 * 15; // 15MB

// checksum make sure that the file is the same when
// if left from the client and reach the server
export const getSignedURL = async (
  type: string,
  size: number,
  checksum: string,
  content: z.infer<typeof ProductSchema>,
) => {
  const session = await auth();
  if (!session) {
    return { failure: "Unauthorized" };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id as string,
    },
  });

  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  const addProduct = await db.product.create({
    data: {
      userId: session.user.id as string,
      name: content.name,
      description: content.description,
      price: content.price,
      imageUrl: signedURL.split("?")[0],
      width: content.width,
      height: content.height
    },
  });

  return { success: { url: signedURL, productDetails: addProduct } };
};

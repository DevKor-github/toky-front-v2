import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION ?? '',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY ?? '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY ?? '',
  },
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
  });
  await s3Client.send(command);
  return fileName;
}

export async function getSignedURL(key: string) {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 3600,
  });
  return { success: { url: signedUrl } };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, key });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

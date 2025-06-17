const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/awsConfig');
const slugify = require('slugify');

const uploadToS3 = async (buffer, originalTitle, filename, mimetype) => {
  const folder = slugify(originalTitle, { lower: true, strict: true }); 
  const key = `${folder}/${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  });
  await s3.send(command);
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = uploadToS3;

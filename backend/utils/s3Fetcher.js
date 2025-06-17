const { GetObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/awsConfig');
const slugify = require('slugify');

const streamToString = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
};

const getTestCasesFromS3 = async (problemName) => {
  const slug = slugify(problemName, { lower: true });
  const key = `${slug}/testcases.json`;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  });

  try {
    const response = await s3.send(command);
    const content = await streamToString(response.Body);
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to fetch test cases from S3:', err.message);
    throw err;
  }
};

module.exports = { getTestCasesFromS3 };

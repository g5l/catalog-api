const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function s3upload(fileName, buffer) {
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: buffer,
    ContentType: 'multipart/form-data',
  };

  const response = await s3.upload(params).promise();
  return response.Location;
}

module.exports = s3upload;

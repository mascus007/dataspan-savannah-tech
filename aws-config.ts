const albumBucketName = 'dataspan.frontend-home-assignment';
const region = 'eu-central-1';
const identityPoolId = 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9';

AWS.config.update({
  region: region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
})

module.exports = s3;
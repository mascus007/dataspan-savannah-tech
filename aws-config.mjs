import AWS from 'aws-sdk';


AWS.config.update({
  region: "eu-central-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9",
  }),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "dataspan.frontend-home-assignment" },
})

module.exports = s3;
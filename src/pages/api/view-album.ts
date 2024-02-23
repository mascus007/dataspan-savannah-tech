import { getImageNameFormKey } from "@/utils/helpers";
// import AWS from "aws-sdk";
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-central-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9',
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'dataspan.frontend-home-assignment' },
}) as any;

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {  
    
    const { albumName } = req.query;
    
  
    try {
        const albumBucketName = 'dataspan.frontend-home-assignment';
        const albumPhotosKey = encodeURIComponent(albumName as string) + '/';

        const data = await s3.listObjects({ Prefix: albumPhotosKey }).promise();

        let testData = await s3.listObjects({ Prefix: albumPhotosKey + "test/images" }).promise();
        let trainData = await s3.listObjects({ Prefix: albumPhotosKey + "train/images" }).promise();
        let validData = await s3.listObjects({ Prefix: albumPhotosKey + "valid/images" }).promise();
        

        const bucketUrl = s3.getSignedUrl('getObject', {
            Bucket: albumBucketName,
            Key: data.Contents.length > 0 ? data.Contents[0].Key : ''
            // Expires: 60, // Set expiration time (adjust as needed)
          });

        const href = new URL(bucketUrl);

        const hostName = href.hostname;  
        const baseUrl = `https://${hostName}/${albumBucketName}/`;
        const subBucketName = "bone-fracture-detection/"

        testData = testData.Contents.slice(0, 200).map((photo: any) => {
            const mainKey = getKeyFromImage(photo.Key)
            return generateRespObj("test", photo, baseUrl, subBucketName, mainKey)
          });

        trainData = trainData.Contents.slice(0, 200).map((photo: any) => {
          const mainKey = getKeyFromImage(photo.Key)
          return generateRespObj("train", photo, baseUrl, subBucketName, mainKey)
        });

        validData = validData.Contents.slice(0, 200).map((photo: any) => {
          const mainKey = getKeyFromImage(photo.Key)
          return generateRespObj("valid", photo, baseUrl, subBucketName, mainKey)
        });

        res.status(200).json({ 
            allGroups: [...testData, ...trainData, ...validData],
            test: testData,
            train: trainData,
            valid: validData,
         });
    
    } catch (error:any) {
        console.log("error",error)
      res.status(500).json({ error: error.message });
    }
  }

  export default handler;


  function getKeyFromImage(imageUrl: string){
    const namePath = imageUrl?.split("/");
    const fileName = namePath[namePath.length - 1];
    const filenameWithoutExtension = fileName.replace(/\.[^.]+$/, '');
    return filenameWithoutExtension
}

function generateRespObj(dirName:string, photo: any, baseUrl:string, subBucketName:string, mainKey:string){
  return{
    key: photo.Key,
    image: `${baseUrl}${encodeURIComponent(photo.Key)}`,
    thumbnail: `${baseUrl}${encodeURIComponent(`${subBucketName}${dirName}/thumbnails/${mainKey}.jpg`)}`,
    name: getImageNameFormKey(photo.Key), 
    label: `${baseUrl}${encodeURIComponent(`${subBucketName}${dirName}/labels/${mainKey}.txt`)}`,
  }
}
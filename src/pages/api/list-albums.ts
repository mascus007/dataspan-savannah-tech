import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {    
  try {
        const albumBucketName = 'dataspan.frontend-home-assignment';
        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: albumBucketName },
        }) as any;
      const data = await s3.listObjects({ Delimiter: '/' }).promise();
      const albums = data.CommonPrefixes.map((commonPrefix: { Prefix: string; }) => decodeURIComponent(commonPrefix.Prefix.replace('/', '')));
  
      res.status(200).json({ albums });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  export default handler;

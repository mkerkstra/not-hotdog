import { Controller, Post, Body } from '@nestjs/common';
import request from 'request';
import { S3 } from 'aws-sdk';

@Controller('prediction')
export class PredictionController {
  @Post()
  async getPrediction(@Body() body: { url: string }) {
    const s3 = new S3();
    const objectKey = body.url.split('/').pop();
    const params = {
      Bucket: 'kerks-hotdog-images',
      Key: objectKey,
    };
    const s3Stream = s3.getObject(params).createReadStream();
    const options = {
      url: 'localhost:5000/predict',
      body: s3Stream,
      headers: { 'Content-Type': 'image/jpeg' }, // Change to the appropriate content type for your image
    };
    const response = await new Promise((resolve, reject) => {
      request.post(options, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    if (response?.['body']) {
      return response?.['body'];
    }
    return response;
  }
}

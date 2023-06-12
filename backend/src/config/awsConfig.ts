import config from '../config/config';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

export default AWS;

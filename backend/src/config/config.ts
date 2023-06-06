import joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVariablesSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development').required(),
    PORT: joi.number().default(3000),
    AWS_REGION: joi.string().required(),
    COGNITO_CLIENT_ID: joi.string().required(),
    USER_POOL_ID: joi.string().required(),
    SECRET_HASH: joi.string().required(),
    ACCESS_KEY: joi.string().required(),
    SECRET_ACCESS_KEY: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVariablesSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  region: envVars.AWS_REGION,
  clientId: envVars.COGNITO_CLIENT_ID,
  userPoolId: envVars.USER_POOL_ID,
  secretHash: envVars.SECRET_HASH,
  accessKey: envVars.ACCESS_KEY,
  secretAccessKey: envVars.SECRET_ACCESS_KEY,
};

export default config;

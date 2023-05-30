import joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVariablesSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development').required(),
    PORT: joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVariablesSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};

export default config;

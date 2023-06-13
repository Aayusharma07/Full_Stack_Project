import config from '../config/config';
import AWS from '../config/awsConfig';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

const cognitoIdentity = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

function hashSecret(username: string) {
  return crypto
    .createHmac('SHA256', config.secretHash)
    .update(username + config.clientId)
    .digest('base64');
}

// User registration
export const registerUser = async (username: string, password: string, email: string) => {
  const params = {
    ClientId: config.clientId,
    Password: password,
    Username: username,
    SecretHash: hashSecret(username),
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    cognitoIdentity.signUp(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Sign up failed'));
        }
      }
    });
  });
};

// User registration
export const confirmRegistration = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    ConfirmationCode: code,
    Username: username,
    SecretHash: hashSecret(username),
  };

  return new Promise((resolve, reject) => {
    cognitoIdentity.confirmSignUp(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Confirm Registration failed'));
        }
      }
    });
  });
};

export const signInUser = async (username: string, password: string) => {
  const params = {
    AuthFlow: config.cognitoAuthFlow,
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: hashSecret(username),
    },
  };
  return new Promise((resolve, reject) => {
    cognitoIdentity.initiateAuth(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Sign in failed'));
        }
      }
    });
  });
};

export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Verify the token using the Cognito service
  try {
    await cognitoIdentity.getUser({ AccessToken: token }).promise();
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

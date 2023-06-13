import AWS from '../config/awsConfig';
import config from '../config/config';

const db = new AWS.DynamoDB.DocumentClient();

export const saveToDynamoDB = async (data: object) => {
  const params = {
    TableName: config.dynamoDBTable,
    Item: data,
  };

  return new Promise((resolve, reject) => {
    db.put(params, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};

export const getAllData = async () => {
  const params = {
    TableName: config.dynamoDBTable,
  };

  return new Promise((resolve, reject) => {
    db.scan(params, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};

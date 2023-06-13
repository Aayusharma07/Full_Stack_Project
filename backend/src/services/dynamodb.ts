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

export const getDataByID = (data: string) => {
  const params = {
    TableName: config.dynamoDBTable,
    Key: {
      id: data,
    },
  };
  return new Promise((resolve, reject) => {
    db.get(params, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};


export const deleteDataById = async(data: string) => {
  const params = {
    TableName: config.dynamoDBTable,
    Key: {
      id: data,
    },
  };
  return new Promise((resolve, reject) => {
    db.delete(params, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
}
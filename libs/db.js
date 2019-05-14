const AWS = require("aws-sdk");

const callDB = (action, params) => {
  const db = new AWS.DynamoDB.DocumentClient();
  return db[action](params).promise();
};

module.exports = callDB;

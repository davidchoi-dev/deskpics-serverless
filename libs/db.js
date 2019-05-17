import AWS from "aws-sdk";

export const callDB = (action, params) => {
  const db = new AWS.DynamoDB.DocumentClient();
  return db[action](params).promise();
};

export const makeDbParams = paramsObj =>
  Object.assign({ TableName: "deskpics" }, paramsObj);

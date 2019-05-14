const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY
  }
});

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

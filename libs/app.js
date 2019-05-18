import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import "./db";
import "../models/Pic";
import "../models/Drink";

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

export default app;

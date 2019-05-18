import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
  }
};

connect();

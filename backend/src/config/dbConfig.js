// import * as dotenv from "dotenv";
// dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const letsConnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB is connected : ${letsConnect.connection.host}`);
  } catch (err) {
    console.log(`MongoDB Error : ${err.message}`);
    process.exit();
  }
};

export default connectDB;

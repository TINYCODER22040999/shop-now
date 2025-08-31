import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.log(`MongoDB URL not found. Please set MONGO_URL in environment variables.`.bgYellow.white);
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;

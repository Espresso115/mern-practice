// to connect to the database

import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Started");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1) // 1 - exit with failure
  }
};
// to connect to the database

import mongoose from "mongoose";

// const url = "mongodb+srv://satwikpati_db_user:whSuYQTDx20bLHKn@test.kcjneqv.mongodb.net/?appName=test";
// mongodb+srv://satwikpati_db_user:<db_password>@test.kcjneqv.mongodb.net/?appName=test
// mongodb://satwikpati_db_user:Methamphetamine_01@test-shard-00-00.kcjneqv.mongodb.net:27017,test-shard-00-01.kcjneqv.mongodb.net:27017,test-shard-00-02.kcjneqv.mongodb.net:27017/test?ssl=true&replicaSet=atlas-test-shard-0&authSource=admin&retryWrites=true&w=majority

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Started");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1) // 1 - exit with failure
  }
};
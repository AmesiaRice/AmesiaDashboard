const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri= "mongodb://localhost:27017/mydatabase";
const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

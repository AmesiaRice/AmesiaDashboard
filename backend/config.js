const mongoose = require("mongoose");
require("dotenv").config();

const mongo_uri= "mongodb+srv://Rahul:Rahulpal123@cluster0.l8qpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

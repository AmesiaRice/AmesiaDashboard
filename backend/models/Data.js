const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: String,
  location: String,
  pincode: String,
  latitude: String,
  longitude: String,
  imageUrl: String,  // Store image path
  date:String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Data", DataSchema);

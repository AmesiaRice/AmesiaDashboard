const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Data = require("../models/Data");

const router = express.Router();

// Ensure 'uploads/' exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ✅ POST: Upload Image & Save Data to MongoDB
 router.post("/location/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  try {
    const date = Date();
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const { name, location,pincode, latitude, longitude } = req.body;

    // Save to MongoDB
    const newData = new Data({ name, location,pincode, latitude, longitude, imageUrl,date });
    await newData.save();

    res.json({ message: "Upload successful!", imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// ✅ GET: Fetch Data from MongoDB
router.get("/auth/location/data", async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});


// ✅ Delete: Data from MongoDB
router.delete("/auth/location/data/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the document first
    const data = await Data.findById(id);
    if (!data) return res.status(404).json({ message: "Data not found" });

    // Extract image filename from the stored URL
    const imagePath = path.join(__dirname, "../uploads", path.basename(data.imageUrl));

    // Delete the image file if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Deletes the image file
    }

    // Now delete the document from MongoDB
    await Data.findByIdAndDelete(id);

    res.json({ message: "Data and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
});

module.exports = router;


const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_images",
    format: async (req, file) => "jpeg",
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

module.exports = router;


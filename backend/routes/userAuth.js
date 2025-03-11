const User = require('../models/user');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ideahub } = require('googleapis/build/src/apis/ideahub');
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, phone, password: hashedPassword, role: role || "user" });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Registration failed", error: err.message });
    }
  });
  
  // 🔹 User/Admin Login
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });
  
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      res.json({ message: "Login successful", token, role: user.role });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  });
  
  // 🔹 Get User Details (Protected)
  router.get("/user", async (req, res) => {
  try {
    // ✅ Get the token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch the logged-in user based on token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Return only the logged-in user's data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user data",
      error: err.message,
    });
  }
});

  router.get("/users", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access Denied! Only Admin can access this data." });
      }
  
      // ✅ Fetch all users from database
      const users = await User.find().select("-password");
      res.json({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch user data", error: err.message });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization?.split(" ")[1];
  
      // ✅ Check if token exists
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // ✅ Verify JWT Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // ✅ Get the user from database based on ID
      const userToDelete = await User.findById(id);
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // ✅ Prevent Deletion of Admin Users
      if (userToDelete.role === "admin") {
        return res.status(403).json({
          message: "Access Denied! Admin users cannot be deleted.",
        });
      }
  
      // ✅ Delete user if not admin
      await User.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete user",
        error: err.message,
      });
    }
  });
  

module.exports = router;
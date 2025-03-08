const express = require("express");
const { login, authCallback, authStatus, logout } = require("../controllers/authController");

const router = express.Router();
router.get("/auth", login);
router.get("/auth/callback", authCallback);
router.get("/auth/status", authStatus);
router.get("/auth/logout", logout);

module.exports = router;

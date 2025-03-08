const express = require("express");
const { getSheetData, submitData, updateRow } = require("../controllers/sheetController");

const router = express.Router();
router.get("/sheets", getSheetData);
router.post("/submit", submitData);
router.post("/updateRow", updateRow);

module.exports = router;

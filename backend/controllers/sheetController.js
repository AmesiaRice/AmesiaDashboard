const { fetchSheetData, appendToSheet, updateSheetRow } = require("../services/googleSheets");

const getSheetData = async (req, res) => {
  try {
    const data = await fetchSheetData("Party_Visit_(1)2!A7:H10000");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
};

const submitData = async (req, res) => {
  try {
    const { employee, selections } = req.body;
    const newRow = [
      new Date().toLocaleString(),
      ...employee,
      selections.saifcoExcel4 || "0",
      selections.saifcoExcel20 || "0",
      selections.saifcoWattanSe4 || "0",
      selections.saifcoWattanSe20 || "0",
      selections.saifcoSuper4 || "0",
      selections.saifcoGold4 || "0",
      selections.saifcoAmber4 || "0",
    ];
    await appendToSheet("Sheet2!A2", newRow);
    res.json({ success: true, message: "Data submitted successfully!" });
  } catch (error) {
    res.status(500).send("Error submitting data: " + error.message);
  }
};

const updateRow = async (req, res) => {
  try {
    const { originalRow, updatedRow } = req.body;
    const rows = await fetchSheetData("Party_Visit_(1)2!A7:H10000");
    const rowIndex = rows.findIndex(row => JSON.stringify(row) === JSON.stringify(originalRow));

    if (rowIndex === -1) return res.status(404).send("Row not found");

    await updateSheetRow(`Party_Visit_(1)2!A${rowIndex + 7}`, Object.values(updatedRow));
    res.json({ success: true, message: "Row updated successfully!" });
  } catch (error) {
    res.status(500).send("Error updating row: " + error.message);
  }
};

module.exports = { getSheetData, submitData, updateRow };

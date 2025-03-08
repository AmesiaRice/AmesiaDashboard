const { google } = require("googleapis");
const { oauth2Client, getSavedTokens } = require("../config/googleAuth");
const { SPREADSHEET_ID } = require("../config/dotenv");

const getSheetsClient = () => {
  const tokens = getSavedTokens();
  if (!tokens) throw new Error("Unauthorized: Please authenticate first.");
  oauth2Client.setCredentials(tokens);
  return google.sheets({ version: "v4", auth: oauth2Client });
};

// Fetch Data
const fetchSheetData = async (range) => {
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range });
  return response.data.values;
};

// Append Data
const appendToSheet = async (range, values) => {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values: [values] },
  });
};

// Update Data
const updateSheetRow = async (range, values) => {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values: [values] },
  });
};

module.exports = { fetchSheetData, appendToSheet, updateSheetRow };

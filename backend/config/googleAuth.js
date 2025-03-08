const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("./dotenv");

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
let savedTokens = null;

module.exports = {
  oauth2Client,
  getSavedTokens: () => savedTokens,
  setSavedTokens: (tokens) => (savedTokens = tokens),
};

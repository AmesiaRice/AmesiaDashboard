const { oauth2Client, setSavedTokens,getSavedTokens } = require("../config/googleAuth");

const login = (req, res) => {
  const url = oauth2Client.generateAuthUrl({ access_type: "offline", scope: ["https://www.googleapis.com/auth/spreadsheets"] });
  res.redirect(url);
};

const authCallback = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    setSavedTokens(tokens);
    res.redirect("http://localhost:3000/sheet");
  } catch (error) {
    res.status(500).send("Authentication failed: " + error.message);
  }
};

const authStatus = (req, res) => {
  res.json({ authenticated: !!getSavedTokens() });
};

const logout = (req, res) => {
  setSavedTokens(null);
  res.json({ status: true, msg: "Logout successful" });
};

module.exports = { login, authCallback, authStatus, logout };

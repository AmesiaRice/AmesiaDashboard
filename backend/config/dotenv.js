require("dotenv").config();
module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: "http://localhost:5000/auth/callback",
  SPREADSHEET_ID: "1XW9GK72g_YGUUvvhF9XJVnBN44h3Jo93Q8PCxqzHfTg",
};

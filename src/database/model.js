require("dotenv").config();
const mysql = require("mysql");

var db = mysql.createConnection({
  database: process.env.DATABASE_NAME || "reciplas",
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  port: process.env.DATABASE_PORT || "3306",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Base de Datos OK.");
});

module.exports = db;

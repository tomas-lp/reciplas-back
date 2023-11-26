require("dotenv").config();
const mysql = require("mysql");

var db = mysql.createConnection({
  database: process.env.MYSQLDATABASE || "reciplas",
  host: process.env.MYSQLHOST || "127.0.0.1",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  port: process.env.MYSQLPORT || "3306",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Base de Datos OK.");
});

module.exports = db;

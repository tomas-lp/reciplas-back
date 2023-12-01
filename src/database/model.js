require('dotenv').config();
const mysql = require('mysql2');

var db = mysql.createPool({
  database: process.env.MYSQLDATABASE || 'reciplas',
  host: process.env.MYSQLHOST || '127.0.0.1',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  port: process.env.MYSQLPORT || '3306',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

db.getConnection((err, conn) => {
  if (err) throw err;
  console.log('Base de Datos OK.');

  db.releaseConnection(conn);
});

module.exports = db;

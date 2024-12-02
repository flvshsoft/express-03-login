const mysql = require("mysql");

// Konfigurasi koneksi
const db = mysql.createConnection({
  host: "localhost", // Host MySQL
  user: "root", // User MySQL
  password: "", // Password MySQL
  database: "ps_express", // Nama database
});

// Hubungkan ke MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = db;

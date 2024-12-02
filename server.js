const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route: Read (GET all data)
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route: Create (POST new data)
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, email });
  });
});

// Route: Update (PUT data)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
});

// Route: Delete (DELETE data)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
});



// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

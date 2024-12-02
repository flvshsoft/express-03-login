const express = require("express");
const db = require("../db");
const router = express.Router();

// Route: Read (GET all users)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route: Create (POST new user)
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, email });
  });
});

// Route: Update (PUT user by ID)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
});

// Route: Delete (DELETE user by ID)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;

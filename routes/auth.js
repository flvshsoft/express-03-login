const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

// Secret Key
const SECRET_KEY = "fs2024";


// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ message: "Error saving user" });
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    const updateSql = "UPDATE users SET refresh_token = ? WHERE id = ?";
    db.query(updateSql, [refreshToken, user.id], (err) => {
      if (err) return res.status(500).json({ message: "Error saving token" });

      res.json({ accessToken, refreshToken });
    });
  });
});

// Refresh Token
router.post("/refresh-token", (req, res) => {
  const { token } = req.body;

  if (!token)
    return res.status(403).json({ message: "Refresh token is required" });

  const sql = "SELECT * FROM users WHERE refresh_token = ?";
  db.query(sql, [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = results[0];

    jwt.verify(token, SECRET_KEY, (err) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  });
});

// Logout User
router.post("/logout", (req, res) => {
  const { id } = req.body;

  const sql = "UPDATE users SET refresh_token = NULL WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Error during logout" });
    res.json({ message: "Logout successful" });
  });
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const db = require("../db");
const path = require("path");

const router = express.Router();

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder tujuan untuk upload
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage });

// Route: Menambah produk
router.post("/", upload.single("foto"), (req, res) => {
  const { nama_produk, harga_produk, barcode, kategori } = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null; // Path file

  const sql =
    "INSERT INTO produk (nama_produk, harga_produk, barcode, kategori, foto) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nama_produk, harga_produk, barcode, kategori, foto],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error inserting data" });
      }
      res.status(201).json({
        message: "Product added successfully",
        product: {
          id: result.insertId,
          nama_produk,
          harga_produk,
          barcode,
          kategori,
          foto,
        },
      });
    }
  );
});

// Route: Mendapatkan semua produk
router.get("/", (req, res) => {
  const sql = "SELECT * FROM produk";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json(results);
  });
});

// Route: Mendapatkan produk berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM produk WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Route: Mengupdate produk
router.put("/:id", upload.single("foto"), (req, res) => {
  const { id } = req.params;
  const { nama_produk, harga_produk, barcode, kategori } = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null; // Path file baru

  const sql = foto
    ? "UPDATE produk SET nama_produk = ?, harga_produk = ?, barcode = ?, kategori = ?, foto = ? WHERE id = ?"
    : "UPDATE produk SET nama_produk = ?, harga_produk = ?, barcode = ?, kategori = ? WHERE id = ?";

  const params = foto
    ? [nama_produk, harga_produk, barcode, kategori, foto, id]
    : [nama_produk, harga_produk, barcode, kategori, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating data" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  });
});

// Route: Menghapus produk
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM produk WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
});

module.exports = router;

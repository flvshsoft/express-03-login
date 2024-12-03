const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./middleware/logger");
const userRoutes = require("./routes/users");
const produkRoutes = require("./routes/produk");

const app = express();

// Middleware global
app.use(cors());
app.use(bodyParser.json());
app.use(logger); // Custom logger middleware
app.use('/uploads', express.static('uploads')); // Folder untuk akses foto

// Routes
app.use("/users", userRoutes);
app.use("/produk", produkRoutes);

// Menjalankan server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

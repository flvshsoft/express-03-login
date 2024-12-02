const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./middleware/logger");
const userRoutes = require("./routes/users");

const app = express();

// Middleware global
app.use(cors());
app.use(bodyParser.json());
app.use(logger); // Custom logger middleware

// Routes
app.use("/users", userRoutes);

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

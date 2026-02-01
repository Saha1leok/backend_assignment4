const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./db");

dotenv.config();

const app = express();
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// ── Routes ──────────────────────────────────
const authRoutes     = require("./routes/authRoutes");
const dishRoutes     = require("./routes/dishRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/auth",       authRoutes);
app.use("/api/dishes",     dishRoutes);
app.use("/api/categories", categoryRoutes);

// ── Connect DB & Start Server ───────────────
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
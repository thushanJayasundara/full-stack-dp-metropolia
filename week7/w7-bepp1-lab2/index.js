require("dotenv").config();

const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRouter");
const connectDB = require("./config/db");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== DATABASE CONNECTION =====
connectDB();

// ===== ROUTES =====
app.use("/api/user", userRoutes);

// ===== START SERVER =====
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

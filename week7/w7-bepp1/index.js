// Load environment variables from .env
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRouter");
const connectDB = require("./config/db");

// Create Express app
const app = express();

// ===== MIDDLEWARE =====

// CORS: Allow requests from other origins (frontend)
app.use(cors());

// Parse JSON in request body
app.use(express.json());

// ===== DATABASE CONNECTION =====

// Connect to MongoDB
connectDB();

// ===== ROUTES =====

// All /api/user/* routes go to userRouter
app.use("/api/user", userRoutes);

// ===== START SERVER =====

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

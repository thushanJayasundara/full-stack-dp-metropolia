const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const uri =
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
      `@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}` +
      `?authSource=${process.env.MONGO_AUTH_SOURCE}`;

    await mongoose.connect(uri);

    console.log("Connected to database");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

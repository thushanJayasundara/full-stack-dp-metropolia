const mongoose = require("mongoose");
require("dotenv").config(); // make sure this is here

// since im using mac book with docker env i change this configuration according to docker
const connectDB = async () => {
  try {
    const uri = `mongodb://root:1234@localhost:27017/web-dev?authSource=admin`;
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

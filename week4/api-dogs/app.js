const express = require("express");
const app = express();

const dogRouter = require("./routes/dogRouter");

// Middleware to parse JSON
app.use(express.json());

// Mount the dog router at /dogs path
app.use("/dogs", dogRouter);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

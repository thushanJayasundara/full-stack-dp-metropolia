const express = require("express");
const app = express();

const bookRouter = require("./routes/bookRouter");

// Middleware to parse JSON
app.use(express.json());

// Mount the book router at /books path
app.use("/books", bookRouter);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

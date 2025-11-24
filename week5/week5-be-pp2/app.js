const express = require("express");
const morgan = require("morgan");
const app = express();

// Import the router (instead of individual functions)
const tourRouter = require("./routes/tourRouter.js");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(morgan("tiny"));

// Use the router for all /tours routes
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);

const port = 4000;
app.listen(port, () => console.log(`Server on port ${port}`));

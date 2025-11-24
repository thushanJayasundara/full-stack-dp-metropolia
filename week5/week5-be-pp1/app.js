const express = require("express");
const app = express();

// Import the router (instead of individual functions)
const tourRouter = require("./routes/tourRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use(express.json());

// Use the router for all /tours routes
app.use("/tours", tourRouter);
app.use("/users", userRouter);

const port = 4000;
app.listen(port, () => console.log(`Server on port ${port}`));

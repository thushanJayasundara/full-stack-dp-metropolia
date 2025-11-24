const express = require("express");
const app = express();

const tourRouter = require("./routes/tourRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use(express.json());

app.use("/api/tours", tourRouter); // ← Changed: added /api
app.use("/api/users", userRouter); // ← Changed: added /api

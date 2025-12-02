const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// POST /api/user/signup
// Expects: { email, password, age, phoneNumber }
router.post("/signup", signupUser);

// POST /api/user/login
// Expects: { email, password }
router.post("/login", loginUser);

module.exports = router;

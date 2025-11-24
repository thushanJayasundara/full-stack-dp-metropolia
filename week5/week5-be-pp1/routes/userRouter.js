const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // ← Add this line

const {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userControllers");

// Public routes - no auth needed
router.get("/", getAllUsersHandler);
router.get("/:userId", getUserByIdHandler);

// Protected routes - auth middleware applied
router.post("/", auth, createUserHandler); // ← Add auth
router.put("/:userId", auth, updateUserHandler); // ← Add auth
router.delete("/:userId", auth, deleteUserHandler); // ← Add auth

module.exports = router;

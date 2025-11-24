const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // ← Add this line

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers.js");

// Public routes - no auth needed
router.get("/", getAllTours);
router.get("/:tourId", getTourById);

// Protected routes - auth middleware applied
router.post("/", auth, createTour); // ← Add auth
router.put("/:tourId", auth, updateTour); // ← Add auth
router.delete("/:tourId", auth, deleteTour); // ← Add auth

module.exports = router;

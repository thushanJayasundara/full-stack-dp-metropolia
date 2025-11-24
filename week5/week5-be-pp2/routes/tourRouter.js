const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");

// Public routes - no auth needed
router.get("/", getAllTours);
router.get("/:tourId", getTourById);
router.post("/", auth, createTour);
router.put("/:tourId", updateTour);
router.delete("/:tourId", deleteTour);

module.exports = router;

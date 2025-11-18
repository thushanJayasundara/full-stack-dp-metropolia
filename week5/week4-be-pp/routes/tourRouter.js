// routes/tourRouter.js

const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers.js");

// Define routes
router.get("/", getAllTours); // GET /tours
router.get("/:tourId", getTourById); // GET /tours/123
router.post("/", createTour); // POST /tours
router.put("/:tourId", updateTour); // PUT /tours/123
router.delete("/:tourId", deleteTour); // DELETE /tours/123

module.exports = router;

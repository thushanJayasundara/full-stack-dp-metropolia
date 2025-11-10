const express = require("express");
const router = express.Router();

const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("../controllers/dogControllers");

// GET /dogs
router.get("/", getAllDogs);

// POST /dogs
router.post("/", createDog);

// GET /dogs/:dogId
router.get("/:dogId", getDogById);

// PUT /dogs/:dogId
router.put("/:dogId", updateDog);

// DELETE /dogs/:dogId
router.delete("/:dogId", deleteDog);

module.exports = router;

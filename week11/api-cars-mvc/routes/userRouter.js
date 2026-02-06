const express = require("express");
const router = express.Router();

const {
    getAll,
    createOne,
    getOneById,
    updateOneById,
    deleteOneById,
} = require("../controllers/userControllers");

// GET /users
router.get("/", getAll);

// POST /users
router.post("/", createOne);

// GET /users/:userId
router.get("/:userId", getOneById);

// PUT /users/:userId
router.put("/:userId", updateOneById);

// DELETE /users/:userId
router.delete("/:userId", deleteOneById);

module.exports = router;
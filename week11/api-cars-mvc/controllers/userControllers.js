// controllers/userControllers.js
const User = require("../models/userModel");

// GET /users
const getAll = (req, res) => {
    const users = User.getAll();
    res.json(users);
};

// POST /users
const createOne = (req, res) => {
    const created = User.addOne({ ...req.body });
    res.status(201).json(created);
};

// GET /users/:userId
const getOneById = (req, res) => {
    const userId = Number(req.params.userId);
    const user = User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
};

// PUT /users/:userId
const updateOneById = (req, res) => {
    const userId = Number(req.params.userId);
    const updated = User.updateById(userId, { ...req.body });

    if (!updated) return res.status(404).json({ error: "User not found" });

    res.json(updated);
};

// DELETE /users/:userId
const deleteOneById = (req, res) => {
    const userId = Number(req.params.userId);
    const deleted = User.deleteById(userId);

    if (!deleted) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Deleted", deleted });
};

module.exports = {
    getAll,
    createOne,
    getOneById,
    updateOneById,
    deleteOneById,
};
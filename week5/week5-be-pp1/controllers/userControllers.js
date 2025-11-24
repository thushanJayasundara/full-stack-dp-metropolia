// controllers/userControllers.js

// Import the user data functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/userModel");

// Get all users
function getAllUsersHandler(req, res) {
  const users = getAllUsers();
  res.json(users);
}

// Get one user by ID
function getUserByIdHandler(req, res) {
  const id = req.params.userId;
  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

// Create a new user
function createUserHandler(req, res) {
  const newUser = req.body;
  const user = createUser(newUser);
  res.status(201).json(user);
}

// Update a user
function updateUserHandler(req, res) {
  const id = req.params.userId;
  const updatedData = req.body;
  const user = updateUser(id, updatedData);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
}

// Delete a user
function deleteUserHandler(req, res) {
  const id = req.params.userId;
  deleteUser(id);
  res.status(204).send();
}

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};

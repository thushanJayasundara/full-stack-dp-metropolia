// models/userModel.js

// Sample user data
let users = [
  {
    id: 1,
    name: "Matti Seppänen",
    email: "matti@example.com",
    password: "M@45mtg$",
    phone_number: "+358401234567",
    gender: "Male",
    date_of_birth: "2000-01-15",
    membership_status: "Active",
  },
  {
    id: 2,
    name: "Anna Korhonen",
    email: "anna@example.com",
    password: "An#98xyz!",
    phone_number: "+358401234568",
    gender: "Female",
    date_of_birth: "1998-05-22",
    membership_status: "Active",
  },
];

// Get all users
function getAllUsers() {
  return users;
}

// Get one user by ID
function getUserById(id) {
  return users.find((user) => user.id == id);
}

// Create a new user
function createUser(newUser) {
  // Auto-generate ID (take the highest ID and add 1)
  const maxId = Math.max(...users.map((u) => u.id), 0);
  newUser.id = maxId + 1;
  users.push(newUser);
  return newUser;
}

// Update a user
function updateUser(id, updatedData) {
  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updatedData };
  return users[userIndex];
}

// Delete a user
function deleteUser(id) {
  users = users.filter((user) => user.id != id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// ============ HELPER FUNCTION: VALIDATE PHONE NUMBER ============
const isValidPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Check if at least 10 digits (standard phone number length)
  return digitsOnly.length >= 10;
};

// ============ HELPER FUNCTION: VALIDATE AGE ============
const isValidAge = (age) => {
  // Age must be a number between 18 and 120
  return !isNaN(age) && age >= 18 && age <= 120;
};

// ============ HELPER FUNCTION: VALIDATE ADDRESS ============
const isValidAddress = (address) => {
  return typeof address === "string" && address.trim().length > 0;
};

// ============ SIGNUP CONTROLLER ============
const signupUser = async (req, res) => {
  // Step 1: Extract all 4 fields from request body
  const { email, password, age, phoneNumber, address } = req.body;

  try {
    // ===== VALIDATION =====

    // Check if all fields are provided
    if (!email || !password || !age || !phoneNumber || !address) {
      throw Error(
        "All fields must be filled (email, password, age, phoneNumber)"
      );
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }

    // Validate password strength
    // Must have: 8+ chars, uppercase, lowercase, number, symbol
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    // Validate age
    if (!isValidAge(age)) {
      throw Error("Age must be a number between 18 and 120");
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
      throw Error("Phone number must have at least 10 digits");
    }

    // Validate the address
    if (!isValidAddress(address)) {
      throw Error("Enter Valid Address");
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw Error("Email already in use");
    }

    // Check if phone number already exists
    const phoneExists = await User.findOne({ phoneNumber });
    if (phoneExists) {
      throw Error("Phone number already in use");
    }

    // ===== HASH PASSWORD =====

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // ===== CREATE USER =====

    // Store user with all 4 fields (password is hashed)
    const user = await User.create({
      email,
      password: hash,
      age,
      phoneNumber,
      address,
    });

    // Send success response
    res.status(200).json({ user });
  } catch (error) {
    // Send error response
    res.status(400).json({ error: error.message });
  }
};

// ============ LOGIN CONTROLLER ============
const loginUser = async (req, res) => {
  // Step 1: Extract email and password from request body
  // Note: Login ONLY needs email and password, not age or phone
  const { email, password } = req.body;

  try {
    // ===== VALIDATION =====

    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }

    // ===== COMPARE PASSWORD =====

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    // ===== SUCCESS =====

    // Send success response with user data
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };

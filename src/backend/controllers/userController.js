const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, password: password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }

};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      res.json({ message: 'Login successful', user: { id: user._id, username: user.username, category: user.category } });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user
const updateUserRole = async (req, res) => {
  const { username, category } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.category = category;
    await user.save();

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
      city: user.city,
      category: user.category,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserByCategory = async (req, res) => {
  try {
    const { category } = req.body
    const users = await User.find({ category: category });
    if (!users) return res.status(400).json({ error: 'No not found' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  const { category } = req.body;
  try {
    const users = await User.find({ category: category })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to get the users' });
  }

}

const updateUserDetails = async (req, res) => {
  const { email, contactNumber, city } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { email, contactNumber, city, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { registerUser, loginUser, updateUserRole, getUserDetails, updateUserDetails, getAllUsers, getUserByCategory };

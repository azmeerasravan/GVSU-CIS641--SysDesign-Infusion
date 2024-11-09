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
    
        // Hash password and create a new user
        console.log('Password before:', password)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword)
        const user = new User({ username, password: hashedPassword });
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
  const { id } = req.params;
  const { category } = req.body;

  try {
    const user = await User.findById(id);
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

module.exports = { registerUser, loginUser, updateUserRole };

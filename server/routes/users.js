const express = require('express');
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all users with pagination (admin only)
router.get('/all', isAdmin, async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const users = await User.find({}, '-password')
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();
    const lastPage = Math.max(1, Math.ceil(total / limit));

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: lastPage,
      limit,
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get single user by filter
router.get('/', async (req, res) => {
  if (!req.query) return res.sendStatus(400);
  try {
    const { filter } = req.query;
    const user = await User.findOne(filter);

    if (user) res.status(200).json(user);
    else res.sendStatus(404);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Create new user
router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { name, email } = req.body;
  const newUser = new User({
    name: name,
    email: email
  });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
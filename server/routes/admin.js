const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Event = require("../models/Event");
const Vote = require("../models/Vote");
const Category = require("../models/Category");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, isGuest } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Handle guest login
    if (isGuest) {
      if (user.role !== 'guest') {
        return res.status(401).json({ message: "Invalid login type" });
      }
    } else {
      // Handle admin login
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      if (!user.password) {
        return res.status(401).json({ message: "Invalid login type" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});


// Clear database route (admin only)
router.post("/clear-db", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    // Clear all collections
    await Promise.all([
      Event.deleteMany({}),
      User.deleteMany({}),
      Vote.deleteMany({}),
      Category.deleteMany({})
    ]);

    res.status(200).json({ message: 'Database cleared successfully' });
  } catch (error) {
    console.error('Clear database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

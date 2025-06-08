const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const jwt = require('jsonwebtoken');
const { subscribe, unsubscribe } = require("../components/emailScheduler");

// Middleware to get user from token
const getUserFromToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Необхідна авторизація' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недійсний токен' });
  }
};

// Get vote count for an event
router.get('/count', async (req, res) => {
  try {
    const { id, vote } = req.query;
    const count = await Vote.countDocuments({ event_id: id, vote: vote === 'true' });
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка підрахунку голосів' });
  }
});

// Get user's vote for an event
router.get('/user-vote', getUserFromToken, async (req, res) => {
  try {
    const { eventId } = req.query;
    const vote = await Vote.findOne({ 
      event_id: eventId,
      user_id: req.user.userId
    });
    res.status(200).json(vote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка отримання голосу' });
  }
});

// Create or update vote
router.post('/', getUserFromToken, async (req, res) => {
  try {
    const { vote, eventId } = req.body;
    const userId = req.user.userId;

    const existingVote = await Vote.findOne({ 
      event_id: eventId,
      user_id: userId
    });

    if (existingVote) {
      // Update existing vote
      existingVote.vote = vote;
      await existingVote.save();
      res.status(200).json(existingVote);
    } else {
      // Create new vote
      const newVote = new Vote({
        vote: vote,
        event_id: eventId,
        user_id: userId
      });
      await newVote.save();
      res.status(201).json(newVote);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка збереження голосу' });
  }
});

// Delete vote
router.delete('/', getUserFromToken, async (req, res) => {
  try {
    const { eventId } = req.query;
    const userId = req.user.userId;

    await Vote.findOneAndDelete({ 
      event_id: eventId,
      user_id: userId
    });

    res.status(200).json({ message: 'Голос видалено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка видалення голосу' });
  }
});

module.exports = router;
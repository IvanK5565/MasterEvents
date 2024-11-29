const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.get('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) res.status(200).json(user);
    else res.status(204).json({ email: req.body.email });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Что-то пошло не так" });
  }
});

router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { firstName, lastName, Email } = req.query;
  const newUser = new User({
    firstname: firstName,
    lastname: lastName,
    email: Email
  });
  // сохраняем в бд
  try {
    await newUser.save();
    res.status(200).json(newUser);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Что-то пошло не так" });
  }
});

module.exports = router;
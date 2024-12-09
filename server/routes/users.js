const express = require('express');
const router = express.Router();
const User = require("../models/User");

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
    res.status(500).json({ error: "Щось пішло не так" });
  }
});

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
    res.status(500).json({ error: "Щось пішло не так" });
  }
});

module.exports = router;
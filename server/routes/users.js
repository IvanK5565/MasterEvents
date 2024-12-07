const express = require('express');
const router = express.Router();
const User = require("../models/User");

router.get('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  try {
    const { filter } = req.body;
    const user = await User.findOne(filter);

    if (user) res.status(200).json(user);
    else res.sendStatus(404);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Что-то пошло не так" });
  }
});

router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const { name, email } = req.body.params;
  const newUser = new User({
    name: name,
    email: email
  });
  //console.log("..."+req.body.params.name);
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
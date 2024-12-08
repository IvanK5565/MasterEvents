const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (_, res) => {
    cats = await Category.find({}, 'name');
    return res.json(cats);
  });


module.exports = router;
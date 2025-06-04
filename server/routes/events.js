const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Category = require('../models/Category');
const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', async (req, res) => {
    try {
        const { filter = {}, page = 1 } = req.query;
        if (filter.name) {
            filter.name = { $regex: filter.name, $options: 'i' };
            const user = await User.findOne({ name: filter.name });
            if (user !== null) {
                const votes = await Vote.find({ user_id: user._id, vote: true }, 'event_id');
                filter._id = { $in: votes.map(v => v.event_id) };
                delete filter.name;
            }
        }
        const skip = (parseInt(page) - 1) * 10;
        const events = await Event.find(filter).skip(skip).limit(10);

        const total = await Event.countDocuments(filter);
        let lastPage = Math.ceil(total / 10);
        lastPage = lastPage == 0 ? 1 : lastPage;

        res.status(200).json({
            total: total,
            page: parseInt(page),
            pages: lastPage,
            limit: 10,
            events: events
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Щось пішло не так' });
    }
});
router.get('/all/', async (req, res) => {
    try {
        const { filter = {} } = req.query;
        const events = await Event.find(filter);
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Щось пішло не так' });
    }
});
router.get('/one/', async (req, res) => {
    try {
        const _id = req.query.id;
        const event = await Event.findById(_id);
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Щось пішло не так' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, describe, date, category } = req.body;
        const newEvent = new Event({
            name: name,
            describe: describe,
            date: date,
            category: category,
        })
        await newEvent.save();
        await Category.findOne({ name: category }).then(res => {
            if (!res) {
                newCat = new Category({ name: category });
                newCat.save();
            }
        })
        res.status(200).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Щось пішло не так' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const { filter = {}, page = 1 } = req.query;
        console.log("events get " + filter)
        if (filter.name) filter.name = { $regex: filter.name, $options: 'i' };

        // Вычисляем пропущенные записи для текущей страницы
        const skip = (parseInt(page) - 1) * 10;

        const events = await Event.find(filter).skip(skip).limit(10);

        // Получаем общее количество записей для формирования мета-данных
        const total = await Event.countDocuments(filter);

        res.status(200).json({
            total: total,
            page: parseInt(page),
            pages: Math.ceil(total / 10),
            limit: 10,
            events: events
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
});
router.get('/one/', async (req, res) => {
    try {
        const _id = req.query.id;
        const event = await Event.findById(_id);
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Что-то пошло не так' });
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

        const query = Category.findOne({ name: category });
        if (query.name != category) {
            newCat = new Category({ name: category });
            await newCat.save();
        }
        res.status(200).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
});

module.exports = router;
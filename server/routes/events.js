const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const { _lastname, _category, page = 1 } = req.query;
        const filter = {};
        if (_category) filter.category = _category;
        if (_lastname) filter.lastname = new RegExp(_lastname, 'i');

        // Вычисляем пропущенные записи для текущей страницы
        const skip = (parseInt(page) - 1) * 10;

        const events = await Event.find(filter).skip(skip).limit(10);

        // Получаем общее количество записей для формирования мета-данных
        const total = await Event.countDocuments(filter);

        res.status(200).json({
            total, // Общее количество записей
            page: parseInt(page), // Текущая страница
            pages: Math.ceil(total / 10), // Общее количество страниц
            limit: 10, // Лимит записей на странице
            data: events // Записи текущей страницы
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
});
router.get('/one/', async (req, res) => {
    try {
        const _id = req.body.id;
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
        const newEvent = Event({
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
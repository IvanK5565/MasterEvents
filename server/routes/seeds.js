const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Event = require('../models/Event');
const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', async (req, res) => {
    const rand = (max) => Math.floor(Math.random() * max)//rand [0,max)
    const cats = ["sport", "music", "holyday"]
    let users = [];
    let events = [];
    let votes = [];

    //events
    for (let i = 0; i < 200; i++) {
        const event = new Event({
            name: "Event " + i,
            describe: "Describe for " + i,
            date: new Date(
                rand(2) + 2024,//year
                rand(12),//month
                rand(30),//day
                rand(12) + 10,//hours
                rand(2) * 30,//min
            ),
            category: cats[rand(3)],
        })
        await event.save();

        await Category.findOne({ name: event.category }).then(res => {
            if (!res) {
                newCat = new Category({ name: event.category });
                newCat.save();
            }
        })
        
        events.push(event);
    }

    //users
    const u = new User({
        name: "Ivan Kozlovsky",
        email: `ivan.kz5565@gmail.com`,
    })
    await u.save();
    users.push(u);
    for (let i = 0; i < 10; i++) {
        const user = new User({
            name: "User " + i,
            email: `example${i}@email.com`,
        })
        await user.save();
        users.push(user);
    }

    //votes
    for (let i = 0; i < 300; i++) {
        const user = new Vote({
            vote: rand(4) > 0,
            event_id: String(events[rand(events.length)]._id),
            user_id: String(users[rand(users.length)]._id),
        })
        await user.save();
        users.push(user);
    }

    res.status(200).json({events,cats,users,votes});
});

module.exports = router;
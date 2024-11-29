const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote')

router.post('/api/vote', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const { _vote, _event, _user } = req.query;
    if (_vote && _event && _user) {
        const vote = new Vote({
            vote: _vote,
            event_id: _event,
            user_id: _user
        });
        // сохраняем в бд
        await vote.save();
        res.status(200).json(vote);
    }
    else{
        res.sendStatus(400);
    }
})

router.get('/api/vote', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const votes = Vote.find();
    res.status(200).json(votes);
})

module.exports = router;
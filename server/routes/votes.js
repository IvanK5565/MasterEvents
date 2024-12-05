const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote')

router.post('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const { _vote, _event, _user } = req.body;
    console.log(req.body)
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
    else {
        res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const votes = await Vote.find();
    res.status(200).json(votes);
})

router.get('/count/', async (req, res) => {
    //return res.json({status: "Bad"})
    //if (!req.body) return res.sendStatus(400);
    const id = req.query.id;
    const vote = req.query.vote;
    if (!id || !vote) {
      console.log('body:' + id);
      return res.sendStatus(401);
    }
    else {
      try {
        const vote_count = await Vote.countDocuments({ event_id: id, vote: vote });
        console.log(vote_count);
        res.status(200).json(vote_count);
      } catch (err) {
        console.error('Ошибка при подсчете документов:', err);
        res.sendStatus(500);
      }
    }
  })

module.exports = router;
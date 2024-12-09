const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote')
const {subscribe, unsubscribe} = require("../components/emailScheduler");

router.post('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const { vote, event, user } = req.body;
    console.log(req.body)
    if (vote && event && user) {
        const voteData = {
            vote: vote,
            event_id: event._id,
            user_id: user._id
        };

        const findedVote = await Vote.findOne({event_id: event._id, user_id: user._id});
        if(findedVote){
          if(findedVote.vote != vote){
            updatedVote = await Vote.findOneAndUpdate(
              {_id: findedVote._id},
              {$set: {vote: vote}},
              {upsert: true}
            )

            if(vote){
              subscribe(user,event);
            }
            else unsubscribe(user,event);
            res.status(200).json(updatedVote);
          }
        }
        else{
          await new Vote(voteData).save();
          if(vote){
            subscribe(user,event);
          }
          res.status(200).json(voteData);
        }
    }
    else {
        res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    if (!req.query) return res.sendStatus(400);
    const votes = await Vote.find();
    res.status(200).json(votes);
})

router.get('/count/', async (req, res) => {
    const {id, vote} = req.query;
    if (!id || !vote) {
      return res.sendStatus(401);
    }
    else {
      try {
        const vote_count = await Vote.countDocuments({ event_id: id, vote: vote });
        console.log(vote_count);
        res.status(200).json(vote_count);
      } catch (err) {
        console.error('Помилка підрахунку кількості:', err);
        res.sendStatus(500);
      }
    }
  })

module.exports = router;
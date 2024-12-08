const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote')
const {subscribe, unsubscribe} = require("../components/emailScheduler");

router.post('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const { _vote, _event, _user } = req.body;
    console.log(req.body)
    if (_vote && _event && _user) {
        const voteData = {
            vote: _vote,
            event_id: _event._id,
            user_id: _user._id
        };

        const findedVote = await Vote.findOne({event_id: _event._id, user_id: _user._id});
        if(findedVote){
          if(findedVote.vote != _vote){
            updatedVote = await Vote.findOneAndUpdate(
              {_id: findedVote._id},
              {$set: {vote: _vote}},
              {upsert: true}
            )

            if(_vote){
              subscribe(_user,_event);
            }
            else unsubscribe(_user,_event);
            res.status(200).json(updatedVote);
          }
        }
        else{
          await new Vote(voteData).save();
          if(_vote){
            subscribe(_user,_event);
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
    //return res.json({status: "Bad"})
    //if (!req.body) return res.sendStatus(400);
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
        console.error('Ошибка при подсчете документов:', err);
        res.sendStatus(500);
      }
    }
  })

module.exports = router;
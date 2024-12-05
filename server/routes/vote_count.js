const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote')

router.get('/', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const {id, vote} = req.query;
    if (!id || !vote){
        console.log('body:' + id);
        return res.sendStatus(401);
    }
    else {
        try {
            const vote_count = Vote.countDocuments({_id:id,vote:vote});
            res.status(200).json({count: vote_count});
        } catch (err) {
            console.error('Ошибка при подсчете документов:', err);
            res.sendStatus(500);
          }
    }
})

module.exports = router;
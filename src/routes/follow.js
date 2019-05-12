const express = require('express');
const router = express.Router();
const { FollowModel } = require('../models/Follow');
router.use(express.json());

router.post('/following', async(req, res) => {

    let follow = {
        userId: req.body.userId,
        userIdFollowed: req.body.userIdFollowed
    }

    var followed = true;
    FollowModel.findOneAndUpdate({
        userId: follow.userId
    },
    { $push:{'userFollowing': {userId: follow.userIdFollowed}}},
        {new: true, upsert: true},
        function(err, model){
            console.log(err);
            followed = false;
        }
    )

    FollowModel.findOneAndUpdate({
        userId: follow.userIdFollowed
    },
    { $push:{'userFollowedBy': {userId: follow.userId}}},
        {new: true, upsert: true},
        function(err, model){
            console.log(err);
            followed = false;
        }
    )

    if(followed) {
        res.send('Success');
    } else{
        res.status(400).send('Unable to follow xD');
    }
});

module.exports = router;
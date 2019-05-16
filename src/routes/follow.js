const express = require('express');
const router = express.Router();
const { FollowModel } = require('../models/Follow');
const { UserModel } = require('../models/User');
router.use(express.json());

router.post('/:id', async(req, res) => {

    let follow = {
        userId: req.body.userId,
        user_to_follow: req.params.id
    }

    var followed = true;
    FollowModel.findOneAndUpdate({userId: follow.userId},
    {$push:{'userFollowing': {userId: follow.user_to_follow}}},
        {new: true, upsert: true},(err, model) => {
            console.log(err);
            followed = false;
        }
    )

    FollowModel.findOneAndUpdate({userId: follow.user_to_follow},
    {$push:{'userFollowedBy': {userId: follow.userId}}},
        {new: true, upsert: true}, (err, model) => {
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

router.get('/followers/:id', async(req, res) => {
    let user_id = req.params.id;
    let user_list = await FollowModel.findOne({userId: user_id});
    return res.send({
        user_list: user_list.userFollowedBy
    });
});

module.exports = router;
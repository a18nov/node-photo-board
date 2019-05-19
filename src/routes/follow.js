const express = require('express');
const router = express.Router();
const { FollowModel } = require('../models/Follow');
const { UserModel } = require('../models/User');
router.use(express.json());
var {ObjectID} = require('mongodb');


router.post('/:id', async(req, res) => {

    
    let follow = {
        userId: req.body.userId,
        user_to_follow: req.params.id
    }

    if(ObjectID.isValid(follow.user_to_follow)){
        UserModel.findById(follow.user_to_follow, 
            function(err, user){
                if(err){
                    res.status(400).send(err); 
                }
            }          
        )
    }else{
        res.status(400).send('Invalid User ID, Please try again!');
    }

    if(follow.userId === follow.user_to_follow){
        res.status(400).send("Can't follow themselves");
    }


    
    FollowModel.findOneAndUpdate(
        {userId: follow.user_to_follow},
        {$push:{'userFollowedBy': {userIds: follow.userId}}},
        {useFindAndModify: false}, 
        function(err, model){
            if(err){
                res.status(400).send("Could not follow the user! User doesn't exist.");
            }
        }
    )
   
    FollowModel.findOneAndUpdate(
    {userId: follow.userId},
    {$push:{'userFollowing': {userIds: follow.user_to_follow}}},
    {useFindAndModify: false},
        function(err, model){
            if(err){
                res.status(400).send("Could not follow the user!");
            }
        }
    )
    
    res.send('Success!');
});

router.get('/followers/:id', async(req, res) => {
    let user_id = req.params.id;
    let user_list = await FollowModel.findOne({userId: user_id});
    return res.send({
        user_list: user_list.userFollowedBy
    });
});

module.exports = router;
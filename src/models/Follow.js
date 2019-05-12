const mongoose = require('mongoose');

const follow_schema = new mongoose.Schema({

   'userId':{
    type: String,
    required: true,
    },
    'userFollowing':{
        'userId':{
            type: String
        }
    },
    'userFollowedBy':{
        'userId':{
            type: String
        }
    }
});

class Follow{
    static async initFollow(newUserId){
        let follower = new FollowModel({
            userId: newUserId
        });
            
        follower = await follower.save();
        return follower; //return function necessary or not
    }
}

follow_schema.loadClass(Follow);

let FollowModel = mongoose.model('Follow', follow_schema);

module.exports = { follow_schema, FollowModel};

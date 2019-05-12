const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
   'userId':{
    type: String,
    required: true,
    },
    'postURL':{
        type: String,
        required: true,
    },
    'postDesc':{
        type: String,
        trim: true
    },
    'comments':{
        'commentId':{
            type: String
        }
    }
});

class Post{
    static async newPost(data_object){
        let boardPost = new PostModel({userId: data_object.userId,
            postURL: data_object.postURL,
            postDesc: data_object.postDesc
        });
            
        boardPost = await boardPost.save();
        return boardPost;
    }
}

post_schema.loadClass(Post);

let PostModel = mongoose.model('Post', post_schema);

module.exports = { post_schema, PostModel};
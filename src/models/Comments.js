const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
   'userId':{
    type: String,
    required: true,
    },
    'postId':{
    type: String,
    required: true,
    },
    'commentText':{
    type: String,
    }
});

class Comment{
    static async addComment(data_object){
        let comment = new CommentModel({
            userId: data_object.userId,
            commentText: data_object.commentText,
            postId:data_object.postId
        });
            
        comment = await comment.save();
        return comment;
    }
}

comment_schema.loadClass(Comment);

let CommentModel = mongoose.model('Comment', comment_schema);

module.exports = { comment_schema, CommentModel};
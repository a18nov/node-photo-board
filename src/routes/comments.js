const express = require('express');
const router = express.Router();
const { CommentModel } = require('../models/Comments');
const { PostModel } = require('../models/Post');
router.use(express.json());

router.post('/addComment', async(req, res) => {

    let comment = {
        userId: req.body.userId,
        commentText: req.body.commentText,
        postId:req.body.postId
    }

    let commented = await CommentModel.addComment(comment);

    var updatedInPost = true;
    PostModel.findByIdAndUpdate(commented.postId,
        {$push:{'comments': {commentId: commented.id}}},
        {new: true},
        function(err, model){
            console.log(err);
            updatedInPost = false;
        }
    );
    

    if(commented && updatedInPost) {
        res.send('Success');
    } else{
        res.status(400).send('Comment not Posted xD');
    }
});

module.exports = router;
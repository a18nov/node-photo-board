const express = require('express');
const router = express.Router();
const { CommentModel } = require('../models/Comments');
const { PostModel } = require('../models/Post');
router.use(express.json());

var {ObjectID} = require('mongodb');

router.post('/add', async(req, res) => {

    let comment = {
        userId: req.body.userId,
        commentText: req.body.commentText,
        postId:req.body.postId
    }

    let commented = await CommentModel.addComment(comment);

    PostModel.findByIdAndUpdate(commented.postId,
        {$push:{'comments': {commentId: commented.id}}},
        {new: true},
        function(err, model){
            if (err)
             res.status(400).send(err);
        }
    );
    
    const response = {
        message: "Comment successfully added",
        id: commented.id
    };

    if(commented) {
        res.status(200).send(response);
    } else{
        res.status(400).send('Comment not Posted xD');
    }
});

router.put('/update/:id', async(req, res) =>{

    var commentId = req.params.id;
    if(ObjectID.isValid(commentId)){

        CommentModel.findByIdAndUpdate(commentId, 
            {commentText: req.body.commentText},
            {new:true},
            function(err, model){
                if (err) return res.status(400).send(err);

                const response = {
                message: "Comment successfully updated",
                id: commentId
            };
            return res.status(200).send(response);
            }        
        )
        //res.send('Updated');
    }
    
});

router.delete('/delete/:id', async(req, res) =>{
    var commentId = req.params.id;
    if(ObjectID.isValid(commentId)){

        CommentModel.findByIdAndRemove(commentId, (err, model) =>{
        
            if (err) return res.status(400).send(err);

            const response = {
                message: "Comment successfully deleted",
                id: commentId
            };
            return res.status(200).send(response);
        })
    
    }

});

module.exports = router;
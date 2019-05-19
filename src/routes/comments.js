const express = require('express');
const router = express.Router();
const { CommentModel } = require('../models/Comments');
const { PostModel } = require('../models/Post');
router.use(express.json());

var {ObjectID} = require('mongodb');
var response;

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
    
    response = {
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

                response = {
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

            response = {
                message: "Comment successfully deleted",
                id: commentId
            };
            return res.status(200).send(response);
        })
    
    }

});

router.put('/like/:id', async(req, res) =>{

    var commentId = req.params.id;
    if(ObjectID.isValid(commentId)){

        CommentModel.findByIdAndUpdate(commentId,
            { $inc: { likes: 1 } },
            {new: true },
            function(err, response) {
                if (err) {
                    return res.status(400).send("Unable to like the comment");
                }
                response = {
                    message: "Liked the comment",
                    id: commentId
                }
                return res.status(200).send(response);
            }
            
        )
    
    }
})

router.put('/dislike/:id', async(req, res) =>{

    var commentId = req.params.id;
    if(ObjectID.isValid(commentId)){

        CommentModel.findByIdAndUpdate(commentId,
            { $inc: { likes: -1 } },
            {new: true },
            function(err, response) {
                if (err) {
                    console.log(err);
                    return res.status(400).send("Unable to dislike the comment");
                   
                }
                response = {
                    message: "Disliked the comment",
                    id: commentId
                }
                return res.status(200).send(response);
            }
            
        )
    
    }
})

module.exports = router;


/*
localhost:6363/api/comment/add

{
 "userId":"5ce192815cb66010de9f128a",
 "commentText":"Adding Comment to get a like.",
 "postId":"5cd80894a6ea57240ce510db"
}

*/
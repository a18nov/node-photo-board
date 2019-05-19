const express = require('express');
const router = express.Router();
const { PostModel } = require('../models/Post');
const { UserModel } = require('../models/User');
router.use(express.json());

var {ObjectID} = require('mongodb');

router.post('/add', async(req, res) => {

    let boardPost = {
        userId: req.body.userId,
        postURL: req.body.postURL,
        postDesc: req.body.postDesc
    }

    if(ObjectID.isValid(boardPost.userId)){
        UserModel.findById(boardPost.userId, 
            function(err, user){
                if(err){
                    res.status(400).send(err); 
                }
            }          
        )
    }else{
        res.status(400).send('Invalid User ID, Please try again!');
    }

    let posted = await PostModel.newPost(boardPost);

    const response = {
        message: "Post successfully added",
        id: posted.id
    };

    if(posted) {
        res.send(response);
    } else{
        res.status(400).send('Post not Posted xD');
    }
});

router.put('/update/:id', async(req, res) =>{

    var postid = req.params.id;
   
    if(ObjectID.isValid(postid)){

        if(req.body.postURL && req.body.postDesc){
        
            PostModel.findByIdAndUpdate(postid, 
                {postURL: req.body.postURL,
                postDesc : req.body.postDesc},
                {new:true},
                function(err, model){
                    if (err) 
                        return res.status(400).send(err);
                    else{
                        const response = {
                            message: "Post successfully updated",
                            id: postid
                        };
                        return res.status(200).send(response);
                    }
                }
            )
        }else if(req.body.postURL && !req.body.postDesc){
    
            PostModel.findByIdAndUpdate(postid, 
                {postURL: req.body.postURL},
                {new:true},
                function(err, model){
                    if (err) 
                        return res.status(400).send(err);
                    else{
                        const response = {
                            message: "Post successfully updated",
                            id: postid
                        };
                        return res.status(200).send(response);
                    }
                }
            )
        }else if(!req.body.postURL && req.body.postDesc){
            
            PostModel.findByIdAndUpdate(postid, 
                {postDesc : req.body.postDesc},
                {new:true},
                function(err, model){
                    if (err) 
                        return res.status(400).send(err);
                    else{
                        const response = {
                            message: "Post successfully updated",
                            id: postid
                        };
                        return res.status(200).send(response);
                    }
                }
            )
        }
       

        
    }
    
});

router.delete('/delete/:id', async(req, res) =>{
    var postid = req.params.id;
    if(ObjectID.isValid(postid)){

        PostModel.findByIdAndRemove(postid, (err, model) =>{
        
            if (err) 
                return res.status(400).send(err);
            else{
                const response = {
                    message: "Post successfully Deleted",
                    id: postid
                };
                return res.status(200).send(response);
            }
        })
    
    }

});


router.put('/like/:id', async(req, res) =>{

    var postId = req.params.id;
    if(ObjectID.isValid(postId)){

        PostModel.findByIdAndUpdate(postId,
            { $inc: { likes: 1 } },
            {new: true },
            function(err, response) {
                if (err) {
                    return res.status(400).send("Unable to like the Post");
                }
                response = {
                    message: "Liked the Post",
                    id: postId
                }
                return res.status(200).send(response);
            }
            
        )
    
    }
})

router.put('/dislike/:id', async(req, res) =>{

    var postId = req.params.id;
    if(ObjectID.isValid(postId)){

        PostModel.findByIdAndUpdate(postId,
            { $inc: { likes: -1 } },
            {new: true },
            function(err, response) {
                if (err) {
                    console.log(err);
                    return res.status(400).send("Unable to dislike the Post");
                   
                }
                response = {
                    message: "Disliked the Post",
                    id: postId
                }
                return res.status(200).send(response);
            }
            
        )
    
    }
})

module.exports = router;
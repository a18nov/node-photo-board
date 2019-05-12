const express = require('express');
const router = express.Router();
const { PostModel } = require('../models/Post');
router.use(express.json());

router.post('/postboard', async(req, res) => {

    let boardPost = {
        userId: req.body.userId,
        postURL: req.body.postURL,
        postDesc: req.body.postDesc
    }

    let posted = await PostModel.newPost(boardPost);

    if(posted) {
        res.send('Success');
    } else{
        res.status(400).send('Post not Posted xD');
    }
});

module.exports = router;
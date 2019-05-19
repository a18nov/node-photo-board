/*const mongoose = require('mongoose');


//userId: likeType: Post/Comment typeId: PostId/CommentId

const like_schema = new mongoose.Schema({

   'userId':{
    type: String,
    required: true,
    },
    likeType:{
        type: String,
        enum : ['POST','COMMENT']
    },
    'parentId':{
        type: String,
        required: true,
    },
    
});

*/
const express = require('express');
const router = express.Router();
const { UserModel } = require('../models/User');
router.use(express.json());

router.post('/create', async(req, res) => {
    
    let data_obj = {
        name: req.body.name,
        email: req.body.email,
        display_name: req.body.display_name,
        description: req.body.description,
        profile_image_url: req.body.profile_image_url,
        phone_number: req.body.phone_number
    }

    let created_user = await UserModel.createUser(data_obj);

    if(created_user) {
        res.send('Success');
    } else{
        res.status(400).send('You made mistake');
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.post('/create/', async(req, res) => {
    const new_user = new User({
        name: req.body.name,
        email: req.body.email,
        display_name: req.body.display_name,
        description: req.body.description,
        profile_image_url: req.body.profile_image_url,
        phone_number: req.body.phone_number
    });

    console.log('1st');
    console.log(req.body);

    await User.createUser(new_user.name, 
        new_user.email, 
        new_user.display_name,
        new_user.description,
        new_user.profile_image_url,
        new_user.phone_number);
});

module.exports = router;
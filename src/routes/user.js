const express = require('express');
const router = express.Router();
const { UserModel } = require('../models/User');

var {ObjectID} = require('mongodb');

router.use(express.json());

router.post('/create', async(req, res) => {
    var validation_check = UserModel.validateUser(req.body);
    if(validation_check.check){
        let data_obj = {
            name: req.body.name,
            email: req.body.email,
            display_name: req.body.display_name,
            description: req.body.description,
            profile_image_url: req.body.profile_image_url,
            phone_number: req.body.phone_number
        }
    
        let created_user = await UserModel.createUser(data_obj);
     
        if(!created_user == -1) {
            res.send('Success');
        } else{
            res.status(400).send('Something went wrong!');
        }
    } else {
        res.status(400).send(validation_check.reason);
    }
});

router.get('/get/:id', (req, res) => {
    var id = req.params.id;
    if(ObjectID.isValid(id)){
        UserModel.findById(id).then((user) => {
            if(!user){
                res.status(400).send('Invalid user ID');
            } else {
                res.send({user});
            }
        })
    } else{
        res.send('Invalid Object Id!');
    }
});

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    if(ObjectID.isValid(id)){
        UserModel.findByIdAndRemove(id).then((user) => {
            if(!user){
                res.status(400).send('Invalid user ID');
            } else{
                res.send({user});
            }
        })
    } else {
        res.send('Invalid Object Id!');
    }
});

module.exports = router;
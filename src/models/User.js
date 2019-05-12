const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    'name':{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }, 'email': {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    }, 'display_name': {
        type: String,
        trim: true
    }, 'description': {
        type: String
    }, 'profile_image_url': {
        type: String
    }, 'phone_number': {
        type: Number,
        default: 100
    }
});

class User {
    static async createUser(data_object){
        let user = new UserModel({name: data_object.name,
            email: data_object.email,
            display_name: data_object.display_name,
            description: data_object.description,
            profile_image_url: data_object.profile_image_url,
            phone_number: data_object.phone_number});

        let data = {};
        user = await user.save().then(() => {
            data.user = user;            
        }).catch( (e) =>{
            data.reason = 'Duplicate key';
        });
        return data;
    }

    static validateUser(user_data){
        var validation_model = {
            check: false,
            reason: ''
        };
        if(!user_data.name){
            validation_model.check = false;
            validation_model.reason = 'Name not provided';
        } else{
            if(user_data.name.length < 3){
                validation_model.check = false;
                validation_model.reason = 'Name is smaller than 3 letters';
            } else {
                if(!user_data.email){
                    validation_model.check = false;
                    validation_model.reason = 'No email provided';
                } else {
                    var verification_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(verification_re.test(String(user_data.email).toLowerCase())){
                        validation_model.check = true;
                    } else{
                        validation_model.check = false;
                        validation_model.reason = 'Email not proper';
                    }
                }
            }
        }
        return validation_model;
    }
}

user_schema.loadClass(User);

let UserModel = mongoose.model('User', user_schema);

module.exports = { user_schema, UserModel};
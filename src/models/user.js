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
        user = await user.save();
        return user;
    }
}

user_schema.loadClass(User);

let UserModel = mongoose.model('User', user_schema);

module.exports = { user_schema, UserModel};
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
        unique: true,
    }, 'display_name': {
        type: String,
        trim: true
    }, 'description': {
        type: String
    }, 'profile_image_url': {
        type: String
    }, 'phone_number': {
        type: Number
    }
});

class User {
    static async createUser(mName, mEmail, mDisplay_name, mDescription, mProfile_image_url, mPhone_number){
        console.log(mName, mEmail, mDisplay_name, mDescription, mProfile_image_url, mPhone_number);
        let UserModel = mongoose.model('User', user_schema);
        let user = new UserModel({name: mName,
            email: mEmail,
            display_name: mDisplay_name,
            description: mDescription,
            profile_image_url: mProfile_image_url,
            phone_number: mPhone_number});
        await user.save();
        return user;
    }
}

user_schema.loadClass(User);

module.exports = { user_schema, User};
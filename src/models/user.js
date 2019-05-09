var mongoose = require('mongoose');

var User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }, email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
    }, display_name: {
        type: String,
        trim: true
    }, description: {
        type: String
    }, profile_image_url: {
        type: URL
    }, phone_number: {
        type: Number
    }
});

class UserClass {
    static async createUser(name, email, display_name, description, profile_image_url, phone_number){
        let user = new User({
            name: name,
            email: email,
            display_name: display_name,
            description: description,
            profile_image_url: profile_image_url,
            phone_number: phone_number
        });

        await user.save();
        return user;
    }
}

module.exports = {User};
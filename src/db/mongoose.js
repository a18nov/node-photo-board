const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/node-photo-board', {
    useNewUrlParser: true,
    useCreateIndex: true
});

//Have to refactor this part till down
//Just to show how models work
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const ankit = new User({
    name: 'Ankit',
    age: 23
})

ankit.save().then(() => {
    console.log(ankit)
}).catch((error) => {
    console.log("Error : ", error)
})

const anubhav = new User({
    name: 'Anubhav',
    age: 24
})
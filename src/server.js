const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

async function start(){
    app.use('/api', require('./routes'));

    app.post('/create', (req, res) => {
        console.log(req.body);
    });

    app.listen(port, () => {
        console.log(`Started at port ${port}`);
    });
}

// app.use(bodyParser.json());

// app.get('/users', (req, res) => {
//     User.find().then((todos) => {
//         res.send({
//             todos,
//             "count": todos.count
//         });
//     }, (e) => {
//         res.status(400).send(e);
//     })
// });



start();
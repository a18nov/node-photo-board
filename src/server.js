const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    User.find().then((todos) => {
        res.send({
            todos,
            "count": todos.count
        });
    }, (e) => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = {app};
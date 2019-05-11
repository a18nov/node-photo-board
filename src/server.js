const express = require('express');

require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000;

async function start(){
    app.use(express.json());
    app.use('/api', require('./routes'));

    app.listen(port, () => {
        console.log(`Started at port ${port}`);
    });
}

start();
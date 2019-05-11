const express = require('express');

require('./src/db/mongoose');

var app = express();
const port = process.env.PORT || 6363;

async function start(){
    app.use(express.json());
    app.use('/api', require('./src/routes'));

    app.listen(port, () => {
        console.log(`Started at port ${port}`);
    });
}

start();
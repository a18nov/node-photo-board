var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-photo-board-db' || 'mongodb://DrZod:GenuinePassword@95@ds151596.mlab.com:51596/node-photo-board-db', { useNewUrlParser: true });

module.exports = {mongoose};
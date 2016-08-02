var express = require('express');
path = require('path');

var db = require(path.join(__dirname, 'models', 'db'));

// Connect to mongodb
db.connect();

var app = express();

app.use(express.static('public')); // default index property is 'index.html'

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;

var express = require('express');
var app = express();


app.use(express.static('public')); // default index property is 'index.html'

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;

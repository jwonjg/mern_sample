var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false});

app.use(express.static('public')); // default index property is 'index.html'

var cities = {
  'Lotopia':'some description',
  'Caspiana':'some description',
  'Indigo':'some description'
};

app.get('/', function(request, response) {
  response.send('OK');
});

app.get('/cities', function(request, response) {
  response.json(Object.keys(cities));
});

app.post('/cities', urlencoded, function(request, response) {
  var newCity = request.body;
  cities[newCity.name] = newCity.description;
  response.status(201).json(newCity.name);
});

module.exports = app;

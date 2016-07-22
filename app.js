var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false});

app.use(express.static('public')); // default index property is 'index.html'

// * redis
// var redis = require('redis');
// if (process.env.REDISTOGO_URL) {
//   var rtg = require("url").parse(process.env.REDISTOGO_URL);
//   var client = redis.createClient(rtg.port, rtg.hostname);
//   client.auth(rtg.auth.split(":")[1]);
// } else {
//   var client = redis.createClient();
//   client.select((process.env.NODE_ENV || 'development').length);
// }

// * redis
// client.hset('cities', 'Lotopia', 'some description');
// client.hset('cities', 'Caspiana', 'some description');
// client.hset('cities', 'Indigo', 'some description');

var cities = {
  'Lotopia':'some description',
  'Caspiana':'some description',
  'Indigo':'some description'
};

// unreachable. cause default index property takes request
// app.get('/', function(request, response) {
//   response.send('OK');
// });

app.get('/cities', function(request, response) {
  // * redis
  // client.hkeys('cities', function(error, names) {
  //   if(error) throw error;
  //   response.json(names);
  // });
  response.json(Object.keys(cities));
});

app.post('/cities', urlencoded, function(request, response) {
  var newCity = request.body;
  // * redis
  // client.hset('cities', newCity.name, newCity.description, function(error) {
  //   if(error) throw error;
  //   response.status(201).json(newCity.name);
  // });
  cities[newCity.name] = newCity.description;
  response.status(201).json(newCity.name);
});

app.delete('/cities/:name', function(request, response) {
  // client.hdel('cities', request.params.name, function(error) {
  //   if(error) throw error;
  //   response.sendStatus(204);
  // });
  delete cities[request.params.name];
  response.sendStatus(204);
});

module.exports = app;

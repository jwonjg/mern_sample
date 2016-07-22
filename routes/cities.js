var express = require('express');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false});

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

var initCities = {
  'Lotopia':'some description',
  'Caspiana':'some description',
  'Indigo':'some description'
};

// unreachable. cause default index property takes request
// app.get('/', function(request, response) {
//   response.send('OK');
// });

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    // * redis
    // client.hkeys('cities', function(error, names) {
    //   if(error) throw error;
    //   response.json(names);
    // });
    response.json(Object.keys(initCities));
  })
  .post(urlencoded, function(request, response) {
    var newCity = request.body;
    if(!newCity.name || !newCity.description) {
      response.sendStatus(400);
      return false;
    }
    // * redis
    // client.hset('cities', newCity.name, newCity.description, function(error) {
    //   if(error) throw error;
    //   response.status(201).json(newCity.name);
    // });
    initCities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
  });

router.route('/:name')
  .delete(function(request, response) {
    // client.hdel('cities', request.params.name, function(error) {
    //   if(error) throw error;
    //   response.sendStatus(204);
    // });
    delete initCities[request.params.name];
    response.sendStatus(204);
  })
  .get(function(request, response) {
    // * redis
    // client.hset('cities', request.params.name, function(error, description) {
    //   if(error) throw error;
    //   response.render('show.ejs',
    //     {city:
    //       {name: request.params.name, description:description}
    //     });
    // });
    response.render('show.ejs',
    {city:
      {name: request.params.name, description:initCities[request.params.name]}
    });
  });

  module.exports = router;

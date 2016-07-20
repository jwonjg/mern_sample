var express = require('express');
var app = express();

app.use(express.static('public')); // default index property is 'index.html'

app.get('/', function(request, response) {
  response.send('OK');
});

app.get('/cities', function(request, response) {
  response.json(['Lotopia', 'Caspiana', 'Indigo']);
});

module.exports = app;

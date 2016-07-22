var request = require('supertest');
var app = require('./app');

// * redis
// var redis = require('redis');
// var client = redis.createClient();
// client.select('test'.length);
// client.flushdb();

describe('Requests to the root path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(error) {
        if(error) throw error;
        done();
      });
  });
});

describe('Listing cities on /cities', function() {
  it('Returns 200 status code', function(done) {
    request(app)
      .get('/cities')
      .expect(200, done);
  });

  it('Returns JSON format', function(done) {
    request(app)
      .get('/cities')
      .expect('Content-Type', /json/, done);
  });

  it('Returns initial cities', function(done) {
    request(app)
      .get('/cities')
      .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done);
  });

  it('Returns a HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  });

  it('Returns an index file with Cities', function(done) {
    request(app)
    .get('/')
    .expect(/cities/i, done); // can't get it exactly
  });
});

describe('Creating new cities', function() {
  it('Returns a 201 status code', function(done) {
    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(201, done);
  });

  it('Return the city name', function(done) {
    request(app)
    .post('/cities')
    .send('name=Springfield&description=where+the+simpsons+live')
    .expect(/springfield/i, done);
  });

  it('Validates city name and describe', function(done) {
    request(app)
      .post('/cities')
      .send('name=&description=')
      .expect(400, done);
  });
});

describe('Deleting cities', function() {
  // * redis
  // before(function(){
  //   client.hset('cities', 'Banana', 'a tasty fruit');
  // });
  // after(function(){
  //   client.flushdb();
  // });

  it('Returns a 204 status code', function(done) {
    request(app)
      .delete('/cities/Lotopia')
      .expect(204, done);
  });
});

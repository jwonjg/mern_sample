var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/'+(process.env.NODE_ENV || 'dev');

exports.connect = function() {
  if(mongoose.DB) {
    return mongoose.DB;
  }
  mongoose.connect(dbURI);
  var db = mongoose.connection;
  db.on('error', function() {
    console.log("Problem with mongo.");
    process.exit(1);
  });
  db.on('open', function() {
    console.log("Connected to mongo.");
    mongoose.DB = db;
  });
};

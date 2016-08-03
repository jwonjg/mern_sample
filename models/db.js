var mongoose = require('mongoose');

exports.connect = function() {
  if(mongoose.DB) {
    return mongoose.DB;
  }

  var dbURI;
  if(process.env.MONGODB_URI) {
    dbURI = process.env.MONGODB_URI+'/'+(process.env.NODE_ENV || 'dev');
  } else {
    dbURI = 'mongodb://localhost/'+(process.env.NODE_ENV || 'dev');
  }
  mongoose.connect(dbURI);

  var db = mongoose.connection;
  db.on('error', function() {
    console.log(dbURI);
    console.log("Problem with mongo.");
    process.exit(1);
  });
  db.on('open', function() {
    console.log("Connected to mongo.");
    mongoose.DB = db;
  });
};

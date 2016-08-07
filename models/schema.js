var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
  name : String,
  description : String,
  regDate : { type : Date, default : Date.now }
});

CitySchema.statics.findOrCreate = function(args, cb) {
  var query = {name : args.name};
  var newCity = {name: args.name, description: args.description, regDate : Date.now() };
  var options = {upsert:true, returnNewDocument: true, setDefaultsOnInsert: true};
  return this.findOneAndUpdate(query, newCity, options, function(err, oldCity){
    cb(err, oldCity);
  });
};

CitySchema.statics.findByArgs = function(args, cb) {
  return this.find(args, function(err, cities){
    cb(err, cities);
  });
};

CitySchema.statics.removeByArgs = function(args, cb) {
  return this.findOneAndRemove(args, function(err, city){
    cb(err, city);
  });
};

var City = mongoose.model('City', CitySchema);

module.exports = {
  City : City
};

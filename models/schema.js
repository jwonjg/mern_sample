var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
  name : String,
  description : String,
  regDate : { type : Date, default : Date.now }
});

var City = mongoose.model('City', CitySchema);

module.exports = {
  City : City
};

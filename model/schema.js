var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
  name : String,
  description : String,
  regDate : Date
}, { collection: 'cities' });

var City = mongoose.model('City', CitySchema);

module.exports = {
  City : City
};

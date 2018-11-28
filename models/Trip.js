const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
  destination: String,
  description: String,
  photos: [{source: String}, {description: String}],
  startDate: Date,
  endDate: Date
  // creator: User.id
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;

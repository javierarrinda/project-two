const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema({
  travelers: [],
  trips: []
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

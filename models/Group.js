const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const groupSchema = new Schema({
  creator: Schema.Types.ObjectId,
  name: String,
  travelers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  trip: {type: Schema.Types.ObjectId, ref: 'Trip'}
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

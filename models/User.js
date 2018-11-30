const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  groups: [Schema.Types.ObjectId],
  trips: [Schema.Types.ObjectId]
}, {
  timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;

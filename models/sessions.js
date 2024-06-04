const Mongoose = require('mongoose');

const sessionSchema = new Mongoose.Schema({
  sessionId: String,
  sessionData: Object,
  expires: Date,
});

module.exports = Mongoose.model('Session', sessionSchema);
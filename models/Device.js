const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
  deviceId: {
    unique: true,
    type: String,
    trim: true,
    maxlength: 100,
    required: true
  }
}));
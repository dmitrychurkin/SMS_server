const { model, Schema } = require('mongoose');

module.exports = model('Device', new Schema({
  deviceId: {
    unique: true,
    type: String,
    trim: true,
    maxlength: 100,
    required: true
  },
  socketId: String,
  connected: Boolean
}));
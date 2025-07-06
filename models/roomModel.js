const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  disabledReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);

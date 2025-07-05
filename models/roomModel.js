const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number, // number of guests allowed
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true // e.g., Deluxe, Super Deluxe
  },
  price: {
    type: Number,
    required: true // base price (without breakfast)
  },
  withBreakfastPrice: {
    type: Number // optional: price if guest chooses breakfast
  },
  capacity: {
    type: Number,
    default: 2
  },
  amenities: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String
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

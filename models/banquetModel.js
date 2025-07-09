const mongoose = require('mongoose');

const banquetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  amenities: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Banquet', banquetSchema);

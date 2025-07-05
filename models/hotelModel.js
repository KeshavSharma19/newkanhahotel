const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
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

module.exports = mongoose.model('Hotel', hotelSchema);

const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  number: Number,
  type: String, 
  price: Number,
  available: { type: Boolean, default: true },
  amenities: [String]
});

module.exports = mongoose.model('Room', roomSchema);

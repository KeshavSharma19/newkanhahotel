const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  },
  disabledReason: {
    type: String,
    default: ''
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Table', tableSchema);

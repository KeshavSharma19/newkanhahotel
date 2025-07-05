const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: { 
    type: String, 
    default: '' 
  },
  token: { 
    type: String
  } 
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('admin', adminSchema);

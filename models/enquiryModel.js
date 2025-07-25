// models/enquiryModel.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'responded', 'closed'],
    default: 'new'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Enquiry', enquirySchema);

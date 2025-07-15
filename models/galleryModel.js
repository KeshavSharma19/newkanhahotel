const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String, 
      required: true
    },
    type: {
      type: String,
      enum: ['room', 'banquet', 'restaurant', 'general'],
      default: 'general' 
    },
    uploadedBy: {
      type: String, 
      default: 'admin'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);

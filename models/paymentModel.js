const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
 bookingType: {
    type: String,
    enum: ['room', 'banquet', 'restaurant'],
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomBooking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'pending'
  },
  mode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  method: {
    type: String,
    // enum: ['razorpay', 'cash', 'upi', 'card', 'other'],
    required: true
  },
  transactionId: {
    type: String,
    default: ''
  },
  paidAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Payment', paymentSchema);

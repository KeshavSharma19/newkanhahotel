const mongoose = require('mongoose');

const banquetBookingSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Banquet',
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phone: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    // required: true
  },
  startTime: {
    type: String, // e.g., "15:00" or "03:00 PM"
    // required: true
  },
  endTime: {
    type: String, // e.g., "19:00" or "07:00 PM"
    // required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed', 'pending'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  numberOfHours: {
    type: Number
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  createdBy: {
    type: String, // 'admin' or 'guest'
    default: 'guest'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('BanquetBooking', banquetBookingSchema);

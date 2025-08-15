const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
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
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
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
  numberOfDays: {
    type: Number
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  createdBy: {
    type: String, // can be 'admin' or 'guest'
    default: 'guest'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('RoomBooking', roomBookingSchema);

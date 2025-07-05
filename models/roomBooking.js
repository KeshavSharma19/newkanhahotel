const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  guestName: {
    type: String,
    required: true
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
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
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

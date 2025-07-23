const mongoose = require('mongoose');

const tableBookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  numberOfGuests: { type: Number, required: true },
  tableNumber: { type: Number },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },
  specialRequest: { type: String },
  preOrderedItems: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: { type: Number },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TableBooking', tableBookingSchema);

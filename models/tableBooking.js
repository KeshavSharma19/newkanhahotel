const mongoose = require('mongoose');

const tableBookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String, required: true },
  date: { type: Date, required: true },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  numberOfGuests: { type: Number, required: true },
  tableNumber: { type: String },
  
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  },

  specialRequest: { type: String, default: '' },

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
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('TableBooking', tableBookingSchema);

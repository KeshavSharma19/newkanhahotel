const express = require("express");
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('../db/conn');
const morgan = require('morgan');

// Import controllers
const bookingController = require('./controllers/booking.controller');

// ✅ Webhook route must come BEFORE express.json()
app.post(
  '/bookings/confirm-booking/webhook',
  express.raw({ type: 'application/json' }),
  bookingController.razorpayWebhook
);

// Middleware for other routes
app.use(cors({ origin: '*' }));
app.use(express.json()); // after webhook
app.use(express.static('public'));
app.use(morgan(':method :url :status - :response-time ms'));
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// All other routes
const routes = require('./routes/indexRoute');
app.use('/', routes);

const PORT = process.env.WEB_PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Web server running on port ${PORT}`);
});

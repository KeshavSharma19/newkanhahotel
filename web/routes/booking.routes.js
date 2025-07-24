const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/room-booking/:roomTypeId', verifyToken , bookingController.bookRoom);
router.post('/banquet-booking', verifyToken , bookingController.bookBanquet);
router.post('/table-booking', verifyToken , bookingController.bookTable);
router.post('/confirm-booking/webhook', bookingController.razorpayWebhook); // webhook
router.get('/get-bookings', verifyToken , bookingController.getUserBookings);
router.post('/booking-cancel/:id',  bookingController.cancelBooking); 

module.exports = router;

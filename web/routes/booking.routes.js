const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

<<<<<<< HEAD
router.post('/get-user-booking/:roomId', verifyToken , bookingController.bookRoom); //main
router.get('/get-booking', verifyToken , bookingController.getUserBookings);
=======
router.post('/room-booking/:roomTypeId', verifyToken , bookingController.bookRoom);
router.post('/banquet-booking', verifyToken , bookingController.bookBanquet);
router.post('/confirm-booking/webhook', bookingController.razorpayWebhook); // webhook
router.get('/get-bookings', verifyToken , bookingController.getUserBookings);
>>>>>>> 52ffe71ef45969ab9ae11207ffb0f7e9da057df2
router.post('/booking-cancel/:id',  bookingController.cancelBooking); 

module.exports = router;

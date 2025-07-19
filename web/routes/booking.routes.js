const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/get-user-booking', verifyToken , bookingController.bookRoom); //main
router.get('/get-booking', verifyToken , bookingController.getUserBookings);
router.post('/booking-cancel/:id',  bookingController.cancelBooking); 

module.exports = router;

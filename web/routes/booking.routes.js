const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/',  bookingController.bookRoom);
router.get('/',  bookingController.getUserBookings);
router.delete('/:id',  bookingController.cancelBooking);

module.exports = router;

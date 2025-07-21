const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/tableBookingController');
const auth = require('../middlewares/auth');

router.post('/create', auth , bookingController.createBooking);
router.get('/', auth , bookingController.getAllBookings);
router.put('/:id/status',  auth , bookingController.updateBookingStatus);

module.exports = router;

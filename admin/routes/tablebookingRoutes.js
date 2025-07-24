const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/tableBookingController');
const auth = require('../middlewares/auth');

router.post('/table-booking-create/:tableId', auth , bookingController.createBooking);
router.get('/get-table-booking', auth , bookingController.getAllBookings);
// router.post('/update-status/:id',  auth , bookingController.updateBookingStatus);

module.exports = router;

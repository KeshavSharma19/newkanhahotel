const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const banquetController = require('../controllers/banquetController');
const auth = require('../middlewares/auth');

// BANQUET CRUD
router.post('/add-banquet', auth, upload.array('images', 5), banquetController.addBanquet);
router.get('/list-banquets', auth, banquetController.listBanquets);
router.post('/update-banquet/:hallId', auth, upload.array('images', 5), banquetController.updateBanquet);
router.post('/delete-banquet/:hallId', auth, banquetController.deleteBanquet);

// BANQUET BOOKING
router.post('/book-banquet/:hallId', auth, banquetController.bookBanquet);
// router.post('/confirm-banquet-booking/:bookingId', auth, banquetController.updateBookingPayment);
router.get('/bookings/:hallId', auth, banquetController.getBanquetBookings);
router.post('/booking-cancel/:bookingId', auth, banquetController.cancelBanquetBooking);
// router.get('/check-availability/:hallId', banquetController.checkBanquetAvailability);

module.exports = router;

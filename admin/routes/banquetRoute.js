const express = require('express');
const router = express.Router();
const banquetController = require('../controllers/banquetController');
const auth = require('../middlewares/auth');
const { route } = require('./roomsRoute');
const upload = require('../../utils/multer');

router.post('/add-banquet', auth, banquetController.addBanquet);
router.get('/list-banquets', auth, banquetController.listBanquets);
router.put('/update-banquet/:banquetId', auth, banquetController.updateBanquet);
router.delete('/delete-banquet/:banquetId', auth, banquetController.deleteBanquet);

// BOOKING BANQUET
router.post('/:banquetId/book-banquet', auth, banquetController.bookBanquet);
router.get('/:banquetId/bookings', auth, banquetController.getBanquetBookings);
router.patch('/booking/:bookingId/cancel', auth, banquetController.cancelBanquetBooking);
router.get('/:banquetId/check-availability', banquetController.checkBanquetAvailability);

module.exports = router;

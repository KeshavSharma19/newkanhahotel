const express = require('express');
const router = express.Router();
const banquetController = require('../controllers/banquetController');
const auth = require('../middlewares/auth');
const upload = require('../../utils/multer');

// BANQUET CRUD
router.post('/add-banquet', auth, upload.array('images', 5), banquetController.addBanquet);
router.get('/list-banquets', auth, banquetController.listBanquets);
router.put('/update-banquet/:hallId', auth, upload.array('images', 5), banquetController.updateBanquet);
router.delete('/delete-banquet/:hallId', auth, banquetController.deleteBanquet);

// BANQUET BOOKING
router.post('/:hallId/book-banquet', auth, banquetController.bookBanquet);
router.get('/:hallId/bookings', auth, banquetController.getBanquetBookings);
router.patch('/booking/:bookingId/cancel', auth, banquetController.cancelBanquetBooking);
router.get('/:hallId/check-availability', banquetController.checkBanquetAvailability);

module.exports = router;

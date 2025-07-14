const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const roomController = require('../controllers/roomController');
const auth = require('../middlewares/auth');

// ADDING TYPE OF ROOMS
router.post('/add-room-type', auth, upload.array('images', 5), roomController.createRoomType);
router.get('/view-room-types', auth, roomController.getAllRoomTypes);
router.get('/view-room-type/:roomId', auth, roomController.getRoomTypeById);
router.post('/update-room-type/:roomId', auth, upload.array('images', 5), roomController.updateRoomType);
router.post('/delete-room-type/:roomId', auth, roomController.deleteRoomType);

// ADDING ROOM NUMBER
router.post('/add-room/:typeId', auth, roomController.addRoom);
router.get('/view-rooms/:typeId', auth, roomController.viewAllRooms);
router.post('/delete-room/:roomId', auth, roomController.deleteRoom);
router.post('/change-room-status/:roomId', auth, roomController.toggleRoomAvailability);
router.get('/view-room/:roomId/bookings', auth, roomController.viewPastBookings);
router.post('/update-room/:roomId', auth, roomController.updateRoom);

// BOOKING ROOM
router.post('/book-room/:roomId', auth, roomController.bookRoom);
router.put('/update-booking-payment/:bookingId', auth, roomController.updateBookingPayment);
router.patch('/cancel-room-booking/:bookingId', auth, roomController.cancelRoomBooking);

module.exports = router;
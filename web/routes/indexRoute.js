const express = require('express');
const router = express.Router();

const authRoutes = require('../routes/auth.routes');
const roomRoutes = require('../routes/room.routes');
const roomBooking = require('../routes/booking.routes');

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', roomBooking);

module.exports = router;

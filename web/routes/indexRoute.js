const express = require('express');
const router = express.Router();

const authRoutes = require('../routes/auth.routes');
const roomRoutes = require('../routes/room.routes');
const bookingRoutes = require('../routes/booking.routes');
const banquetRoutes = require('../routes/banquet.route'); 
const restaurantRoutes = require('../routes/restaurant.route');
const contactRoute = require("../routes/contact.route");

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/banquet', banquetRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/bookings', bookingRoutes);
router.use('/contact', contactRoute);

module.exports = router;

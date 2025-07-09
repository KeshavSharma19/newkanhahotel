const express = require('express');
const router = express.Router();

const adminRoutes = require('../routes/adminRoute');
const roomRoutes = require('../routes/roomsRoute');
const userRoutes = require('../routes/userRoute');

router.use('/admin', adminRoutes);
router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);

module.exports = router;

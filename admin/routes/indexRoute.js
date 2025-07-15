const express = require('express');
const router = express.Router();

const adminRoutes = require('../routes/adminRoute');
const roomRoutes = require('../routes/roomsRoute');
const userRoutes = require('../routes/userRoute');
const banquetRoutes = require('../routes/banquetRoute');
const galleryRoutes = require('../routes/galleryRoute');

router.use('/admin', adminRoutes);
router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);
router.use('/banquet', banquetRoutes);
router.use('/gallery', galleryRoutes);

module.exports = router;

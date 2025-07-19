const express = require('express');
const router = express.Router();

const adminRoutes = require('../routes/adminRoute');
const roomRoutes = require('../routes/roomsRoute');
const userRoutes = require('../routes/userRoute');
const banquetRoutes = require('../routes/banquetRoute');
const galleryRoutes = require('../routes/galleryRoute');
const categoryRoutes = require('../routes/categoryRoutes');
const menuItemRoutes = require('../routes/menuItemRoutes');

router.use('/admin', adminRoutes);
router.use('/rooms', roomRoutes);
router.use('/users', userRoutes);
router.use('/banquet', banquetRoutes);
router.use('/gallery', galleryRoutes);
router.use('/category', categoryRoutes);
router.use('/menu', menuItemRoutes);

// ✅ Test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: '✅ Test route working!' });
});

module.exports = router;

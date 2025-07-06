const express = require('express');
const router = express.Router();

const adminRoutes = require('../routes/adminRoute');
const roomRoutes = require('../routes/roomsRoute');

router.use('/admin', adminRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;

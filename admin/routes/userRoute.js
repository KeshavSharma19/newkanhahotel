const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/all-users', auth, userController.getAllUsers);
router.get('/user-bookings/:userId', auth, userController.getUserBookings);

module.exports = router;

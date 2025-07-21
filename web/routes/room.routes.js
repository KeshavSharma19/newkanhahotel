const express = require('express');
const router = express.Router();
const {
  getAllRoomTypes,
  getRoomTypeById,
  getAllRoom,
  getRoomById
} = require('../controllers/room.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/view-room-types', getAllRoomTypes);
router.get('/room-types/:id', getRoomTypeById);
router.get('/getallrooms', getAllRoom);
router.get('/:id', getRoomById);

module.exports = router;

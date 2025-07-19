const express = require('express');
const router = express.Router();
const {
  getAllRoomTypes,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  getAllRoom
} = require('../controllers/room.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/view-room-types', getAllRoomTypes);
router.get('/getallrooms', getAllRoom);
router.get('/:id', getRoomTypeById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllRoomTypes, getRoomTypeById, createRoomType, updateRoomType, deleteRoomType } = require('../controllers/room.controller');
const { verifyToken } = require('../middlewares/auth.middleware');


router.get('/getallrooms', getAllRoomTypes);
router.get('/:id', getRoomTypeById);

module.exports = router;

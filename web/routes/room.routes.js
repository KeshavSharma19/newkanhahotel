const express = require('express');
const router = express.Router();
const { getAllRoomTypes, getRoomTypeById, createRoomType, updateRoomType, deleteRoomType } = require('../controllers/room.controller');
const { verifyToken } = require('../middlewares/auth.middleware');


router.get('/getallrooms', getAllRoomTypes);
router.get('/:id', getRoomTypeById);
router.post('/createroom', verifyToken, createRoomType);
router.put('/updateroom/:id', updateRoomType);
router.delete('/deleteroom/:id', verifyToken, deleteRoomType);

module.exports = router;

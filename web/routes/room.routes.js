const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/room.controller');
const { verifyToken } = require('../middlewares/auth.middleware');


router.get('/getallrooms', getAllRooms);
router.get('/:id', getRoomById);
router.post('/createroom', verifyToken, createRoom);
router.put('/updateroom/:id', updateRoom);
router.delete('/deleteroom/:id', verifyToken, deleteRoom);

module.exports = router;

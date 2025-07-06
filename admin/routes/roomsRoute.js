const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const roomController = require('../controllers/roomController');
const auth = require('../middlewares/auth');

router.post('/add-room', auth, upload.array('images', 5), roomController.createRoom);
router.get('/view-rooms', roomController.getAllRooms);
router.get('/room/:roomId', roomController.getRoomById);
router.put('/update-room/:roomId', auth, upload.array('images', 5), roomController.updateRoom);
router.delete('/delete-room/:roomId', auth, roomController.deleteRoom);

module.exports = router;
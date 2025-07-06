const express = require('express');
const router = express.Router();
const upload = require('../../utils/multer');
const roomController = require('../controllers/roomController');
const auth = require('../middlewares/auth');

router.post('/add-room-type', auth, upload.array('images', 5), roomController.createRoomType);
router.get('/view-room-types', auth, roomController.getAllRoomTypes);
router.get('/view-room-type/:roomId', auth, roomController.getRoomTypeById);
router.put('/update-room-type/:roomId', auth, upload.array('images', 5), roomController.updateRoomType);
router.delete('/delete-room-type/:roomId', auth, roomController.deleteRoomType);

router.post('/add-room/:typeId', auth, roomController.addRoom);
router.get('/view-rooms/:typeId', auth, roomController.viewAllRooms);
router.delete('/delete-room/:roomId', auth, roomController.deleteRoom);
router.put('/change-room-status/:roomId', auth, roomController.toggleRoomAvailability);

module.exports = router;
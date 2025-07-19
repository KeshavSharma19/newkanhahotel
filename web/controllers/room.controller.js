const Room = require('../../models/roomModel');
console.log("Room controller loaded");
const roomService = require('../services/roomService');

exports.getAllRoom = async (req, res) => {
  try {
    const result = await roomService.getAllRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getAllRoomTypes = async (req, res) => {
  try {
    const result = await roomService.getAllRoomTypes(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};


// const createRoomType = async (req, res) => {
//     try {
//         // Check if a room with the same room number already exists
//         const existingRoom = await Room.findOne({ roomNumber: req.body.roomNumber });
//         if (existingRoom) {
//             return res.status(201).json({ message: 'Room with this number already exists' });
//         }
//         const room = new Room(req.body);
//         await room.save();
//         res.status(201).json({ message: 'Room created successfully', room });
//     } catch (err) {
//         res.status(400).json({ error: 'Failed to create room' });
//     }
// };


// const updateRoomType = async (req, res) => {
//     try {
//         const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!room) return res.status(404).json({ error: 'Room not found' });
//         res.json({ message: 'Room updated successfully', room });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ error: 'Failed to update room' });
//     }
// };



exports.getRoomTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await roomService.RoomTypeById(id);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};


// const deleteRoomType = async (req, res) => {
//     try {
//         const room = await Room.findByIdAndDelete(req.params.id);
//         if (!room) return res.status(404).json({ error: 'Room not found' });
//         res.json({ message: 'Room deleted successfully' });
//     } catch (err) {
//         res.status(400).json({ error: 'Failed to delete room' });
//     }
// };




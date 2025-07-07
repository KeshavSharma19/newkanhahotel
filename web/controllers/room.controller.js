const Room = require('../models/Room');
console.log("Room controller loaded");

const getAllRoomTypes = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};


const createRoomType = async (req, res) => {
    try {
        // Check if a room with the same room number already exists
        const existingRoom = await Room.findOne({ roomNumber: req.body.roomNumber });
        if (existingRoom) {
            return res.status(201).json({ message: 'Room with this number already exists' });
        }
        const room = new Room(req.body);
        await room.save();
        res.status(201).json({ message: 'Room created successfully', room });
    } catch (err) {
        res.status(400).json({ error: 'Failed to create room' });
    }
};


const updateRoomType = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.json({ message: 'Room updated successfully', room });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Failed to update room' });
    }
};



const getRoomTypeById = async (req, res) => {
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


const deleteRoomType = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.json({ message: 'Room deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete room' });
    }
};




module.exports = {
    getAllRoomTypes,
    getRoomTypeById,
    createRoomType,
    updateRoomType,
    deleteRoomType
};
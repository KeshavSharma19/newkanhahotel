const Room = require('../../models/roomModel');
const mongoose = require('mongoose');

exports.createRoom = async (req) => {
  try {
    const {
      title,
      type,
      price,
      capacity,
      amenities,
      description,
      withBreakfastPrice
    } = req.body;

    const files = req.files || [];
    const typeDir = req.query.type || 'rooms';

    const images = files.map(file => `/images/${typeDir}/${file.filename}`);

    if (!title || !type || !price) {
      return {
        status: false,
        message: 'Title, type, and price are required'
      };
    }

    await Room.create({
      title,
      type,
      price,
      capacity,
      amenities: amenities ? JSON.parse(amenities) : [],
      description,
      withBreakfastPrice,
      images
    });

    return {
      status: true,
      message: 'Room created successfully'
    };
  } catch (error) {
    console.error('Service Error - createRoom:', error);
    return {
      status: false,
      message: 'Failed to create room'
    };
  }
};


exports.getAllRooms = async () => {
  try {
    const rooms = await Room.find({}, { createdAt: 0, updatedAt: 0 });
    return {
      status: true,
      message: 'Rooms fetched successfully',
      data: rooms
    };
  } catch (error) {
    console.error('Service Error - getAllRooms:', error);
    return {
      status: false,
      message: 'Failed to fetch rooms'
    };
  }
};


exports.getRoomById = async (req) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return {
        status: false,
        message: 'Room not found'
      };
    }

    const baseUrl = process.env.BASE_URL || '';
    const roomData = room.toObject();
    roomData.images = roomData.images.map(img => `${baseUrl}${img}`);

    return {
      status: true,
      message: 'Room fetched successfully',
      data: roomData
    };
  } catch (error) {
    console.error('Service Error - getRoomById:', error);
    return {
      status: false,
      message: 'Failed to fetch room'
    };
  }
};


exports.updateRoom = async (req) => {
  try {
    const roomId = req.params.roomId;
    const updates = req.body;

    if (updates.amenities && typeof updates.amenities === 'string') {
      updates.amenities = JSON.parse(updates.amenities);
    }

    const files = req.files || [];
    const typeDir = req.query.type || 'rooms';
    if (files.length > 0) {
      updates.images = files.map(file => `/images/${typeDir}/${file.filename}`);
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, {
      new: true
    });

    if (!updatedRoom) {
      return {
        status: false,
        message: 'Room not found'
      };
    }

    return {
      status: true,
      message: 'Room updated successfully',
      data: updatedRoom
    };
  } catch (error) {
    console.error('Service Error - updateRoom:', error);
    return {
      status: false,
      message: 'Failed to update room'
    };
  }
};


exports.deleteRoom = async (req) => {
  try {
    const roomId = req.params.roomId;
    const deleted = await Room.findByIdAndDelete(roomId);
    if (!deleted) {
      return {
        status: false,
        message: 'Room not found'
      };
    }
    return {
      status: true,
      message: 'Room deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteRoom:', error);
    return {
      status: false,
      message: 'Failed to delete room'
    };
  }
};

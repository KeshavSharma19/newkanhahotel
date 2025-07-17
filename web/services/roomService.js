
const Room = require('../../models/roomModel');
const RoomsType = require("../../models/roomTypeModel")


exports.getAllRoom = async () => {
  try {
    const rooms = await Room.find({}, { createdAt: 0, updatedAt: 0 });
    return {
      status: true,
      message: 'Rooms fetched successfully',
      data: rooms
    };
  } catch (error) {
    console.error('Service Error - getAllRoomTypes:', error);
    return {
      status: false,
      message: 'Failed to fetch rooms'
    };
  }
};


exports.getAllRoomTypes = async () => {
  try {
    const rooms = await RoomsType.find({}, { createdAt: 0, updatedAt: 0 });
    return {
      status: true,
      message: 'Rooms Type fetched successfully',
      data: rooms
    };
  } catch (error) {
    console.error('Service Error - getAllRoomTypes:', error);
    return {
      status: false,
      message: 'Failed to fetch rooms'
    };
  }
};


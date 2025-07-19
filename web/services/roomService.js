
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

exports.RoomTypeById = async (id) => {
  try {
    const room = await RoomsType.findById(id, { createdAt: 0, updatedAt: 0 });
    if (!room) {
      return {
        status: false,
        message: 'Room not found'
      };
    }
    return {
      status: true,
      message: 'Room fetched successfully',
      data: room
    };
  } catch (error) {
    console.error('Service Error - getRoomById:', error);
    return {
      status: false,
      message: 'Failed to fetch room'
    };
  }
};

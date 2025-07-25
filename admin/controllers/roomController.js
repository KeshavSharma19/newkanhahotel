const roomService = require('../services/roomService');

exports.createRoomType = async (req, res) => {
  try {
    const result = await roomService.createRoomType(req);
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

exports.getRoomTypeById = async (req, res) => {
  try {
    const result = await roomService.getRoomTypeById(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.updateRoomType = async (req, res) => {
  try {
    const result = await roomService.updateRoomType(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.deleteRoomType = async (req, res) => {
  try {
    const result = await roomService.deleteRoomType(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const result = await roomService.addRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.viewAllRooms = async (req, res) => {
  try {
    const result = await roomService.viewAllRooms(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const result = await roomService.deleteRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.toggleRoomAvailability = async (req, res) => {
  try {
    const result = await roomService.toggleRoomAvailability(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.viewPastBookings = async (req, res) => {
  try {
    const result = await roomService.viewPastBookings(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
exports.updateRoom = async (req, res) => {
  try {
    const result = await roomService.updateRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const result = await roomService.bookRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.updateBookingPayment = async (req, res) => {
  try {
    const result = await roomService.updateBookingPayment(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.cancelRoomBooking = async (req, res) => {
  try {
    const result = await roomService.cancelRoomBooking(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
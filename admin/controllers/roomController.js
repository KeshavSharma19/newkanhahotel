const roomService = require('../services/roomService');

exports.createRoom = async (req, res) => {
  try {
    const result = await roomService.createRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const result = await roomService.getAllRooms(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const result = await roomService.getRoomById(req);
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

exports.deleteRoom = async (req, res) => {
  try {
    const result = await roomService.deleteRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
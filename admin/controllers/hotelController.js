const hotelService = require('../services/hotelService');

exports.createHotel = async (req, res) => {
  try {
    const result = await hotelService.createHotel(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Create Hotel error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const result = await hotelService.getAllHotels();
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Get All Hotels error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const result = await hotelService.getHotelById(hotelId);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Get Hotel By ID error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updateData = req.body;
    const result = await hotelService.updateHotel(hotelId, updateData);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Update Hotel error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const result = await hotelService.deleteHotel(hotelId);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Delete Hotel error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
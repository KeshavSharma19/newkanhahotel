const banquetService = require('../services/banquetService');

exports.addBanquet = async (req, res) => {
  try {
    const result = await banquetService.addBanquet(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.listBanquets = async (req, res) => {
  try {
    const result = await banquetService.listBanquets(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.updateBanquet = async (req, res) => {
  try {
    const result = await banquetService.updateBanquet(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.deleteBanquet = async (req, res) => {
  try {
    const result = await banquetService.deleteBanquet(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.bookBanquet = async (req, res) => {
  try {
    const result = await banquetService.bookBanquet(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.getBanquetBookings = async (req, res) => {
  try {
    const result = await banquetService.getBanquetBookings(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.cancelBanquetBooking = async (req, res) => {
  try {
    const result = await banquetService.cancelBanquetBooking(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.checkBanquetAvailability = async (req, res) => {
  try {
    const result = await banquetService.checkBanquetAvailability(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error adding banquet:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

const bookingService = require('../services/booking.service');

exports.bookRoom = async (req, res) => {
  console.log('Booking request received:', req.body);
  const result = await bookingService.bookRoom(req);
  res.status(result.status ? 200 : 400).json(result);
};

exports.getUserBookings = async (req, res) => {
  const result = await bookingService.getUserBookings(req);
  res.status(result.status ? 200 : 400).json(result);
};

exports.cancelBooking = async (req, res) => {
  const result = await bookingService.cancelBooking(req);
  res.status(result.status ? 200 : 400).json(result);
};



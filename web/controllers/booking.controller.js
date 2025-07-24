const bookingService = require('../services/booking.service');

exports.bookRoom = async (req, res) => {
<<<<<<< HEAD
  console.log('Booking request received:', req.body);
  const result = await bookingService.bookRoom(req);
  res.status(result.status ? 200 : 400).json(result);
=======
  try {
    const result = await bookingService.bookRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('bookRoom error:', error);
    res.status(500).json({ status: false, message: 'Server error while booking room' });
  }
};

exports.bookBanquet = async (req, res) => {
  try {
    const result = await bookingService.bookBanquet(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('bookBanquet error:', error);
    res.status(500).json({ status: false, message: 'Server error while booking room' });
  }
};

exports.razorpayWebhook = async (req, res) => {
  try {
    const result = await bookingService.razorpayWebhook(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('razorpayWebhook error:', error);
    res.status(500).json({ status: false, message: 'Webhook processing failed' });
  }
>>>>>>> 52ffe71ef45969ab9ae11207ffb0f7e9da057df2
};

exports.getUserBookings = async (req, res) => {
  try {
    const result = await bookingService.getUserBookings(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('getUserBookings error:', error);
    res.status(500).json({ status: false, message: 'Failed to fetch user bookings' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const result = await bookingService.cancelBooking(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('cancelBooking error:', error);
    res.status(500).json({ status: false, message: 'Failed to cancel booking' });
  }
};

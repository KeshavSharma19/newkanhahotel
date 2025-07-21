const bookingService = require('../services/tablebookingservice');

exports.createBooking = async (req, res) => {
    try {
        const result = await bookingService.createBooking(req);
        res.status(result.status ? 200 : 400).json(result);
    } catch (error) {
        console.error('Controller Error - createBooking:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const result = await bookingService.getAllBookings();
        res.status(result.status ? 200 : 400).json(result);
    } catch (error) {
        console.error('Controller Error - getAllBookings:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const result = await bookingService.updateBookingStatus(req);
        res.status(result.status ? 200 : 400).json(result);
    } catch (error) {
        console.error('Controller Error - updateBookingStatus:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
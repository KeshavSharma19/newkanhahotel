const Booking = require('../../models/roomBooking');
const Room = require('../../models/roomModel');
const User = require('../../models/userModel');
const Payment = require('../../models/paymentModel');
exports.bookRoom = async (req) => {
    try {
        const { roomId } = req.params;
        const {
            guestName,
            phone,
            checkIn,
            checkOut,
            totalAmount,
            paymentMode = 'online',
            paymentMethod,
        } = req.body;

        if (!guestName || !phone || !checkIn || !checkOut || !totalAmount || !paymentMethod) {
            return { status: false, message: 'All booking and payment details are required' };
        }

        // Parse and validate dates
        const parsedCheckIn = new Date(checkIn);
        const parsedCheckOut = new Date(checkOut);

        if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
            return { status: false, message: 'Invalid check-in or check-out date format' };
        }

        if (parsedCheckOut <= parsedCheckIn) {
            return { status: false, message: 'Check-out must be after check-in' };
        }

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return { status: false, message: 'Room not found.' };
        }

        if (!room.isAvailable) {
            return { status: false, message: 'Room is currently not available.' };
        }

        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({
                name: guestName,
                phone,
                email: '',
                password: ''
            });
        }

        const booking = await Booking.create({
            roomId,
            guestName,
            phone,
            checkIn: parsedCheckIn,
            checkOut: parsedCheckOut,
            totalAmount,
            createdBy: 'guest',
            userId: user._id
        });

        const payment = await Payment.create({
            bookingId: booking._id,
            amount: totalAmount,
            mode: paymentMode,
            method: paymentMethod,
        });

        booking.paymentId = payment._id;
        await booking.save();

        return {
            status: true,
            message: 'Room booking processed successfully!',
            data: {
                booking,
                payment
            }
        };

    } catch (error) {
        console.error('Service Error - bookRoom:', error);
        return {
            status: false,
            message: 'Something went wrong while booking the room'
        };
    }
};

exports.getUserBookings = async (req) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('roomId');
    return {
      status: true,
      message: 'Bookings retrieved successfully',
      data: bookings
    };
  } catch (error) {
    console.error('Service Error - getUserBookings:', error);
    return { status: false, message: 'Failed to retrieve bookings' };
  }
};

exports.cancelBooking = async (req) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return { status: false, message: 'Booking not found or access denied' };
    }

    return {
      status: true,
      message: 'Booking cancelled successfully',
      data: booking
    };
  } catch (error) {
    console.error('Service Error - cancelBooking:', error);
    return { status: false, message: 'Cancellation failed' };
  }
};



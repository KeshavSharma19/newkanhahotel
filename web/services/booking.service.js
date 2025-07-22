
const Booking = require('../../models/roomBooking');
const Room = require('../../models/roomModel');
const User = require('../../models/userModel');
const Payment = require('../../models/paymentModel');
const razorpay = require('../../utils/razorpay');

exports.bookRoom = async (req) => {
    try {
        const { roomId } = req.params;
        const {
            guestName,
            phone,
            checkIn,
            checkOut,
            paymentMode = 'online',
            paymentMethod = "razorpay_gateway",
        } = req.body;

        if (!guestName || !phone || !checkIn || !checkOut  || !paymentMethod) {
            return { status: false, message: 'All booking and payment details are required' };
        }

        const parsedCheckIn = new Date(checkIn);
        const parsedCheckOut = new Date(checkOut);

        if (isNaN(parsedCheckIn.getTime()) || isNaN(parsedCheckOut.getTime())) {
            return { status: false, message: 'Invalid check-in or check-out date format' };
        }

        if (parsedCheckOut <= parsedCheckIn) {
            return { status: false, message: 'Check-out must be after check-in' };
        }

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

        // Create booking
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

        // Razorpay order creation (only if paymentMode is online)
        let razorpayOrder = null;
        if (paymentMode === 'online') {
            const orderOptions = {
                amount: totalAmount * 100, // amount in paisa
                currency: 'INR',
                receipt: `booking_${booking._id}`,
                notes: {
                    guestName,
                    phone,
                    bookingId: booking._id.toString()
                }
            };

            razorpayOrder = await razorpay.orders.create(orderOptions);
        }

        // Save payment record with Razorpay order ID
        const payment = await Payment.create({
            bookingId: booking._id,
            amount: totalAmount,
            mode: paymentMode,
            method: paymentMethod,
            transactionId: razorpayOrder?.id || null,
            bookingType: 'room'
        });

        booking.paymentId = payment._id;
        await booking.save();

        return {
            status: true,
            message: 'Room booking processed successfully!',
            data: {
                booking,
                payment,
                razorpayOrder // send this to frontend for Razorpay checkout
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



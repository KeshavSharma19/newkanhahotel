
const Booking = require('../../models/roomBooking');
const Room = require('../../models/roomModel');
const Banquet = require('../../models/banquetModel');
const Table = require('../../models/tableModel');
const User = require('../../models/userModel');
const Payment = require('../../models/paymentModel');
const razorpay = require('../../utils/razorpay');
const RoomBooking = require('../../models/roomBooking');
const BanquetBooking = require('../../models/banquetBooking');
const TableBooking = require('../../models/tableBooking');
const RoomsType = require("../../models/roomTypeModel")

const mongoose = require('mongoose');
const crypto = require('crypto');

exports.bookRoom = async (req) => {
  try {
    const { roomTypeId } = req.params;
    const {
      guestName,
      phone,
      checkIn,
      checkOut,
      paymentMode = 'online',
      paymentMethod = 'razorpay_gateway',
    } = req.body;

    if (!guestName || !phone || !checkIn || !checkOut || !paymentMethod) {
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
    const roomsType = await RoomsType.find({ _id: roomTypeId, isAvailable: true });


    console.log('Available Room Types:', roomsType[0]?.price);

    //  vfvvv

    // Step 1: Find all rooms of the given roomType
    const rooms = await Room.find({ roomTypeId, isAvailable: true });
    if (!rooms || rooms.length === 0) {
      return { status: false, message: 'No rooms available for this room type' };
    }

    // Step 2: Check availability in RoomBooking
    let availableRoom = null;

    for (const room of rooms) {
      const overlappingBookings = await RoomBooking.find({
        roomId: room._id,
        $or: [
          { checkIn: { $lt: parsedCheckOut }, checkOut: { $gt: parsedCheckIn } }
        ],
        status: 'booked'
      });

      if (overlappingBookings.length === 0) {
        availableRoom = room;
        break;
      }
    }

    if (!availableRoom) {
      return { status: false, message: 'No available rooms for the selected date/time' };
    }

    // Step 3: Create or find user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        name: guestName,
        phone,
        email: '',
        password: ''
      });
    }

    // Step 4: Create Booking in pending status
    const booking = await RoomBooking.create({
      roomId: availableRoom._id,
      guestName,
      phone,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      totalAmount: roomsType[0]?.price,
      createdBy: 'guest',
      userId: user._id,
      status: 'pending'
    });

    // Step 5: Razorpay order creation
    let razorpayOrder = null;
    if (paymentMode === 'online') {
      const orderOptions = {
        amount: roomsType[0]?.price * 100, // in paisa
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

    // Step 6: Create Payment record
    const payment = await Payment.create({
      bookingId: booking._id,
      amount: roomsType[0]?.price,
      mode: paymentMode,
      method: paymentMethod,
      transactionId: razorpayOrder?.id || null,
      bookingType: 'room'
    });

    booking.paymentId = payment._id;
    await booking.save();

    return {
      status: true,
      message: 'Room booking initiated successfully!',
      data: {
        booking,
        payment,
        razorpayOrder // send to frontend for Razorpay checkout
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


exports.bookBanquet = async (req) => {
  try {
    const {
      guestName,
      phone,
      eventDate,
      startTime,
      endTime,
      totalAmount,
      paymentMode = 'online',
      paymentMethod = 'razorpay_gateway',
    } = req.body;

    if (!guestName || !phone || !eventDate || !startTime || !endTime || !totalAmount || !paymentMethod) {
      return { status: false, message: 'All booking and payment details are required' };
    }

    const parsedEventDate = new Date(eventDate);
    if (isNaN(parsedEventDate.getTime())) {
      return { status: false, message: 'Invalid event date format' };
    }

    // Step 1: Get all banquet halls
    const allHalls = await Banquet.find({ _id: mongoose.Types.ObjectId(req.params.id), isAvailable: true });
    if (!allHalls.length) {
      return { status: false, message: 'No banquet halls available in the system' };
    }

    // Step 2: Find one available banquet hall
    let availableHall = null;

    for (const hall of allHalls) {
      const isClashing = await BanquetBooking.findOne({
        hallId: hall._id,
        eventDate: parsedEventDate,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ],
        status: { $in: ['pending', 'confirmed'] }
      });

      if (!isClashing) {
        availableHall = hall;
        break; // Pick the first available hall (or remove break to collect all and pick random)
      }
    }

    if (!availableHall) {
      return { status: false, message: 'No banquet hall available for the selected time slot' };
    }

    // Step 3: Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        name: guestName,
        phone,
        email: '',
        password: ''
      });
    }

    // Step 4: Create booking
    const booking = await BanquetBooking.create({
      hallId: availableHall._id,
      guestName,
      phone,
      eventDate: parsedEventDate,
      startTime,
      endTime,
      totalAmount,
      createdBy: 'guest',
      userId: user._id,
      status: 'pending'
    });

    // Step 5: Razorpay order creation
    let razorpayOrder = null;
    if (paymentMode === 'online') {
      const orderOptions = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `banquet_booking_${booking._id}`,
        notes: {
          guestName,
          phone,
          bookingId: booking._id.toString()
        }
      };
      razorpayOrder = await razorpay.orders.create(orderOptions);
    }

    // Step 6: Create payment record
    const payment = await Payment.create({
      bookingId: booking._id,
      amount: totalAmount,
      mode: paymentMode,
      method: paymentMethod,
      transactionId: razorpayOrder?.id || null,
      bookingType: 'banquet'
    });

    booking.paymentId = payment._id;
    await booking.save();

    return {
      status: true,
      message: 'Banquet booking initiated successfully!',
      data: {
        booking,
        payment,
        razorpayOrder
      }
    };

  } catch (error) {
    console.error('Service Error - bookBanquet:', error);
    return {
      status: false,
      message: 'Something went wrong while booking the banquet'
    };
  }
};


exports.bookTable = async (req) => {
  try {
    const {
      guestName,
      phone,
      date,
      startTime,
      endTime,
      numberOfGuests,
      totalAmount,
      paymentMode = 'online',
      paymentMethod = 'razorpay_gateway',
      specialRequest,
      preOrderedItems = []
    } = req.body;

    // 1. Validate input
    if (!guestName || !phone || !date || !startTime || !endTime || !numberOfGuests || !totalAmount || !paymentMethod) {
      return { status: false, message: 'All booking and payment details are required' };
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return { status: false, message: 'Invalid date format' };
    }

    // Combine date with startTime and endTime
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startDateTime = new Date(parsedDate);
    startDateTime.setHours(startHours, startMinutes, 0, 0);

    const endDateTime = new Date(parsedDate);
    endDateTime.setHours(endHours, endMinutes, 0, 0);

    // 2. Find an available table for the given date & time
    const allTables = await Table.find({ isAvailable: true });
    if (!allTables.length) {
      return { status: false, message: 'No tables available in the system' };
    }

    let availableTable = null;

    for (const table of allTables) {
      const isClashing = await TableBooking.findOne({
        tableId: table._id,
        date: parsedDate,
        $or: [
          { startTime: { $lt: endDateTime }, endTime: { $gt: startDateTime } }
        ],
        status: { $in: ['booked', 'confirmed'] }
      });

      if (!isClashing) {
        availableTable = table;
        break;
      }
    }

    if (!availableTable) {
      return { status: false, message: 'No table available for the selected time slot' };
    }

    // 3. Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        name: guestName,
        phone,
        email: '',
        password: ''
      });
    }

    // 4. Create booking in 'pending' status
    const booking = await TableBooking.create({
      guestName,
      phone,
      date: parsedDate,
      startTime: startDateTime,
      endTime: endDateTime,
      numberOfGuests,
      tableId: availableTable._id,
      specialRequest,
      preOrderedItems,
      totalAmount,
      userId: user._id,
      status: 'pending',
      createdBy: 'guest'
    });

    // 5. Create Razorpay order
    let razorpayOrder = null;
    if (paymentMode === 'online') {
      const orderOptions = {
        amount: totalAmount * 100, // in paisa
        currency: 'INR',
        receipt: `table_booking_${booking._id}`,
        notes: {
          guestName,
          phone,
          bookingId: booking._id.toString()
        }
      };
      razorpayOrder = await razorpay.orders.create(orderOptions);
    }

    // 6. Create Payment record
    const payment = await Payment.create({
      bookingId: booking._id,
      amount: totalAmount,
      mode: paymentMode,
      method: paymentMethod,
      transactionId: razorpayOrder?.id || null,
      bookingType: 'table'
    });

    booking.paymentId = payment._id;
    await booking.save();

    return {
      status: true,
      message: 'Table booking initiated successfully!',
      data: {
        booking,
        payment,
        razorpayOrder
      }
    };

  } catch (error) {
    console.error('Service Error - bookTable:', error);
    return { status: false, message: 'Failed to book table' };
  }
};

exports.getUserBookings = async (req) => {
  try {
    const userId = req.user.id;

    const roomBookings = await Booking.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'roomId'
        }
      },
      { $unwind: { path: '$roomId', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'roomtypes',
          localField: 'roomId.roomTypeId',
          foreignField: '_id',
          as: 'roomType'
        }
      },
      { $unwind: { path: '$roomType', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          "roomId.roomTypeId": "$roomType.title",
        }
      }
    ]);

    const banquetBookings = await BanquetBooking.find({ userId }).populate('hallId');

    const formattedRoomBookings = roomBookings.map(b => ({
      ...b,
      bookingType: 'room',
    }));

    const formattedBanquetBookings = banquetBookings.map(b => ({
      ...b.toObject(),
      bookingType: 'banquet'
    }));

    const allBookings = [...formattedRoomBookings, ...formattedBanquetBookings];

    allBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      status: true,
      message: 'All bookings retrieved successfully',
      data: allBookings
    };

  } catch (error) {
    console.error('Service Error - getUserBookings:', error);
    return { status: false, message: 'Failed to retrieve bookings', error: error.message };
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


exports.razorpayWebhook = async (req) => {
  // const secret = process.env.RAZORPAY_WEBHOOK_KEY_SECRET;

  // const signature = req.headers['x-razorpay-signature'];
  // const body = JSON.stringify(req.body);

  // const expectedSignature = crypto.createHmac('sha256', secret)
  //   .update(body)
  //   .digest('hex');

  // if (signature !== expectedSignature) {
  //   console.warn('Invalid Razorpay webhook signature');
  //   return { status: false, message: 'Invalid signature' };
  // }

  console.log('Razorpay Webhook Received:', req.body);
  console.log('Razorpay Webhook Entity:', req.body.payload?.payment?.entity);
  const event = req.body.event;
  const transactionId = req.body.payload?.payment?.entity?.order_id;

  try {
    const payment = await Payment.findOne({ transactionId });

    // console.log('Payment found:', payment);
    if (!payment) {
      return { status: false, message: 'Payment not found' };
    }

    const { bookingType, bookingId } = payment;

    const updateBookingStatus = async (status) => {
      console.log(`Updating ${bookingType} booking status to:`, status);
      const update = { status };
      switch (bookingType) {
        case 'room':
          await RoomBooking.findByIdAndUpdate(bookingId, update);
          break;
        case 'banquet':
          await BanquetBooking.findByIdAndUpdate(bookingId, update);
          break;
        case 'table':
          await TableBooking.findByIdAndUpdate(bookingId, update);
          break;
        default:
          console.warn('Unknown booking type:', bookingType);
      }
    };

    if (event === 'payment.captured') {
      // console.log('Payment captured for booking:', bookingType, bookingId);
      payment.status = 'paid';
      payment.paidAt = new Date();
      await payment.save();

      await updateBookingStatus('booked');

      return {
        status: true,
        message: `Payment captured and ${bookingType} booking confirmed.`,
      };
    }

    if (event === 'payment.failed') {
      // console.log('Payment failed for booking:', bookingType, bookingId);
      payment.status = 'failed';
      await payment.save();

      await updateBookingStatus('cancelled');

      return {
        status: true,
        message: `Payment failed and ${bookingType} booking cancelled.`,
      };
    }

    return {
      status: true,
      message: 'Unhandled or ignored event type',
    };

  } catch (error) {
    console.error('Webhook Service Error:', error);
    return {
      status: false,
      message: 'Webhook processing failed',
      error: error.message
    };
  }
};


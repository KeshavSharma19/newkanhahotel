const ROOMTYPE = require('../../models/roomTypeModel');
const ROOM = require('../../models/roomModel');
const ROOMBOOKING = require('../../models/roomBooking');
const USER = require('../../models/userModel');
const PAYMENT = require('../../models/paymentModel');
const mongoose = require('mongoose');

exports.createRoomType = async (req) => {
  try {
    const {
      title,
      type,
      price,
      capacity,
      amenities,
      description,
      withBreakfastPrice
    } = req.body;

    const existingRoomType = await ROOMTYPE.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      type: { $regex: new RegExp(`^${type}$`, 'i') }
    });

    if( existingRoomType ) {
      return {
        status: false,
        message: 'Room type already exists!'
      }
    }

    const files = req.files || [];
    const typeDir = req.query.type || 'rooms';

    const images = files.map(file => `/images/${typeDir}/${file.filename}`);

    if (!title || !type || !price) {
      return {
        status: false,
        message: 'Title, type, and price are required'
      };
    }

    await ROOMTYPE.create({
      title,
      type,
      price,
      capacity,
      amenities: amenities ? JSON.parse(amenities) : [],
      description,
      withBreakfastPrice,
      images
    });

    return {
      status: true,
      message: 'Room created successfully'
    };
  } catch (error) {
    console.error('Service Error - createRoomType:', error);
    return {
      status: false,
      message: 'Failed to create room'
    };
  }
};


exports.getAllRoomTypes = async () => {
  try {
    const rooms = await ROOMTYPE.find({}, { createdAt: 0, updatedAt: 0 });
    return {
      status: true,
      message: 'Rooms fetched successfully',
      data: rooms
    };
  } catch (error) {
    console.error('Service Error - getAllRoomTypes:', error);
    return {
      status: false,
      message: 'Failed to fetch rooms'
    };
  }
};


exports.getRoomTypeById = async (req) => {
  try {
    const roomId = req.params.roomId;
    const room = await ROOMTYPE.findById(roomId, {createdAt: 0, updatedAt: 0});
    if (!room) {
      return {
        status: false,
        message: 'Room not found'
      };
    }

    const baseUrl = process.env.BASE_URL || '';
    const roomData = room.toObject();
    roomData.images = roomData.images.map(img => `${baseUrl}${img}`);

    return {
      status: true,
      message: 'Room fetched successfully',
      data: roomData
    };
  } catch (error) {
    console.error('Service Error - getRoomTypeById:', error);
    return {
      status: false,
      message: 'Failed to fetch room'
    };
  }
};


exports.updateRoomType = async (req) => {
  try {
    const roomId = req.params.roomId;
    const updates = req.body;

    if (updates.amenities && typeof updates.amenities === 'string') {
      updates.amenities = JSON.parse(updates.amenities);
    }

    const files = req.files || [];
    const typeDir = req.query.type || 'rooms';
    if (files.length > 0) {
      updates.images = files.map(file => `/images/${typeDir}/${file.filename}`);
    }

    const updatedRoom = await ROOMTYPE.findByIdAndUpdate(roomId, updates, {
      new: true
    });

    if (!updatedRoom) {
      return {
        status: false,
        message: 'Room not found'
      };
    }

    return {
      status: true,
      message: 'Room updated successfully',
      data: updatedRoom
    };
  } catch (error) {
    console.error('Service Error - updateRoomType:', error);
    return {
      status: false,
      message: 'Failed to update room'
    };
  }
};


exports.deleteRoomType = async (req) => {
  try {
    const roomId = req.params.roomId;
    const deleted = await ROOMTYPE.findByIdAndDelete(roomId);
    if (!deleted) {
      return {
        status: false,
        message: 'Room not found'
      };
    }
    return {
      status: true,
      message: 'Room deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteRoomType:', error);
    return {
      status: false,
      message: 'Failed to delete room'
    };
  }
};


exports.addRoom = async (req) => {
  try {
    const { roomNumber } = req.body;
    const { typeId } = req.params;

    if (!roomNumber) {
      return { status: false, message: 'Room number is required' };
    }

    const exists = await ROOM.findOne({ roomNumber });
    if (exists) {
      return { status: false, message: 'Room number already exists' };
    }

    const room = await ROOM.create({
      roomTypeId: typeId,
      roomNumber
    });

    return {
      status: true,
      message: 'Room added successfully',
      data: room
    };
  } catch (error) {
    console.error('Service Error - addRoom:', error);
    return {
      status: false,
      message: 'Failed to add room'
    };
  }
};


exports.viewAllRooms = async (req) => {
  try {
    const { typeId } = req.params;
    const { page = 1, limit = 10, search = '' } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = {
      roomTypeId: typeId
    };

    if (search) {
      query.roomNumber = { $regex: search, $options: 'i' };
    }

    const total = await ROOM.countDocuments(query);

    const rooms = await ROOM.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    return {
      status: true,
      message: 'Rooms fetched successfully',
      data: {
        rooms,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    };
  } catch (error) {
    console.error('Service Error - viewAllRooms:', error);
    return {
      status: false,
      message: 'Failed to fetch rooms'
    };
  }
};


exports.deleteRoom = async (req) => {
  try {
    const { roomId } = req.params;

    const deleted = await ROOM.findByIdAndDelete(roomId);
    if (!deleted) {
      return { status: false, message: 'Room not found' };
    }

    return {
      status: true,
      message: 'Room deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteRoom:', error);
    return {
      status: false,
      message: 'Failed to delete room'
    };
  }
};


exports.toggleRoomAvailability = async (req) => {
  try {
    const { roomId } = req.params;
    const { isAvailable, reason } = req.body;

    const room = await ROOM.findById(roomId);
    if (!room) {
      return { status: false, message: 'Room not found' };
    }

    room.isAvailable = isAvailable;

    // Store reason if disabling; clear reason if enabling
    room.disabledReason = isAvailable ? '' : (reason || 'Disabled manually');

    await room.save();

    return {
      status: true,
      message: isAvailable ? 'Room enabled successfully' : 'Room disabled successfully',
      data: room
    };
  } catch (error) {
    console.error('Service Error - toggleRoomAvailability:', error);
    return {
      status: false,
      message: 'Failed to update room availability'
    };
  }
};


exports.viewPastBookings = async (req) => {
  try {
    const { roomId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!roomId) {
      return { status: false, message: 'Room ID is required' };
    }

    const now = new Date();

    const matchStage = {
      $match: {
        roomId: new mongoose.Types.ObjectId(roomId),
        // checkOut: { $lt: now }
      }
    };

    const lookupStage = {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    };

    const unwindStage = {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    };

    const sortStage = {
      $sort: { checkOut: -1 }
    };

    const projectStage = {
      $project: {
        roomId: 1,
        guestName: 1,
        phone: 1,
        checkIn: 1,
        checkOut: 1,
        status: 1,
        totalAmount: 1,
        createdBy: 1,
        paymentId: 1,
        user: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1
        }
      }
    };

    const [results, totalCount] = await Promise.all([
      ROOMBOOKING.aggregate([
        matchStage,
        lookupStage,
        unwindStage,
        sortStage,
        { $skip: skip },
        { $limit: limit },
        projectStage
      ]),
      ROOMBOOKING.countDocuments({
        roomId: new mongoose.Types.ObjectId(roomId),
        checkOut: { $lt: now }
      })
    ]);

    return {
      status: true,
      message: 'Past bookings fetched successfully',
      data: {
        bookings: results,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    };
  } catch (error) {
    console.error('Service Error - viewPastBookings (aggregate):', error);
    return {
      status: false,
      message: 'Failed to fetch past bookings'
    };
  }
};


exports.bookRoom = async (req) => {
  try {
    const { roomId } = req.params;
    const {
      guestName,
      phone,
      checkIn,
      checkOut,
      totalAmount,
      paymentMode = 'offline',
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

    const room = await ROOM.findById(roomId);
    if (!room || !room.isAvailable) {
      return { status: false, message: 'Room not available.' };
    }

    let user = await USER.findOne({ phone });
    if (!user) {
      user = await USER.create({
        name: guestName,
        phone,
        email: '',
        password: ''
      });
    }

    const booking = await ROOMBOOKING.create({
      roomId,
      guestName,
      phone,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      totalAmount,
      createdBy: 'admin',
      userId: user._id
    });

    const payment = await PAYMENT.create({
      bookingId: booking._id,
      amount: totalAmount,
      mode: paymentMode,
      method: paymentMethod,
      bookingType: 'room'
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


exports.updateBookingPayment = async (req) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus } = req.body;

    if (!['paid', 'pending', 'failed'].includes(paymentStatus)) {
      return { status: false, message: 'Invalid payment status' };
    }

    const booking = await ROOMBOOKING.findById(bookingId).populate('paymentId');
    if (!booking) {
      return { status: false, message: 'Booking not found' };
    }

    if (!booking.paymentId) {
      return { status: false, message: 'Payment record not found for this booking' };
    }

    // Update payment record
    const payment = await PAYMENT.findByIdAndUpdate(
      booking.paymentId,
      { status: paymentStatus, paidAt: new Date() },
      { new: true }
    );

    // Optional: Mark room as unavailable if payment is successful
    if (paymentStatus === 'paid') {
      // const room = await ROOM.findById(booking.roomId);
      // if (room) {
      //   room.isAvailable = false;
      //   await room.save();
      // }
      await ROOMBOOKING.findByIdAndUpdate(bookingId, { status: 'booked' });
    }

    return {
      status: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: { bookingId, payment }
    };

  } catch (error) {
    console.error('Service Error - updatePaymentStatus:', error);
    return {
      status: false,
      message: 'Failed to update payment status'
    };
  }
};


exports.cancelRoomBooking = async (req) => {
  try {
    const { bookingId } = req.params;

    const booking = await ROOMBOOKING.findById(bookingId);
    if (!booking) {
      return { status: false, message: 'Booking not found' };
    }

    if (booking.status === 'cancelled') {
      return { status: false, message: 'Booking is already cancelled' };
    }

    booking.status = 'cancelled';
    await booking.save();

    // const room = await ROOM.findById(booking.roomId);
    // if (room) {
    //   room.isAvailable = true;
    //   await room.save();
    // }

    return {
      status: true,
      message: 'Booking cancelled successfully',
      data: booking
    };

  } catch (error) {
    console.error('Service Error - cancelRoomBooking:', error);
    return {
      status: false,
      message: 'Something went wrong while cancelling the booking'
    };
  }
};

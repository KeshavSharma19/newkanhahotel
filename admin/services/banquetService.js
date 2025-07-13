const BANQUET = require('../../models/banquetModel');
const mongoose = require('mongoose');
const PAYMENT = require('../../models/paymentModel');
const USER = require('../../models/userModel');
const BANQUETBOOKING = require('../../models/banquetBooking');

exports.addBanquet = async (req) => {
  try {
    const { name, capacity, pricePerHour, amenities, description } = req.body;
    const files = req.files || [];

    // Validation
    if (!name || !capacity || !pricePerHour) {
      return { status: false, message: 'Name, capacity and pricePerHour are required' };
    }

    // Check if banquet with the same name already exists
    const existing = await BANQUET.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return { status: false, message: 'Banquet with this name already exists' };
    }

    // Handle image paths
    const imagePaths = files.map(file => {
      const folder = req.query.type || 'others';
      return `/images/${folder}/${file.filename}`;
    });

    // Parse amenities if sent as string (e.g., from form-data)
    const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;

    const banquet = await BANQUET.create({
      name,
      capacity,
      pricePerHour,
      description,
      amenities: parsedAmenities || [],
      images: imagePaths
    });

    return {
      status: true,
      message: 'Banquet hall added successfully',
      data: banquet
    };
  } catch (error) {
    console.error('Service Error - addBanquet:', error);
    return { status: false, message: 'Failed to add banquet hall' };
  }
};


exports.listBanquets = async () => {
  try {
    const banquets = await BANQUET.find()
      .select('-createdAt -updatedAt') 
      .sort({ createdAt: -1 });

    return { 
      status: true, 
      message: 'Banquets fetched successfully', 
      data: banquets 
    };
  } catch (error) {
    console.error('Service Error - listBanquets:', error);
    return { status: false, message: 'Failed to fetch banquets' };
  }
};


exports.updateBanquet = async (req) => {
  try {
    const { hallId } = req.params;
    const { name, capacity, pricePerHour, amenities, description } = req.body;
    const files = req.files || [];

    const banquet = await BANQUET.findById(hallId);
    if (!banquet) {
      return { status: false, message: 'Banquet not found' };
    }

    // If name changed, check for duplicate
    if (name && name.toLowerCase() !== banquet.name.toLowerCase()) {
      const duplicate = await BANQUET.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (duplicate) {
        return { status: false, message: 'Another banquet with this name already exists' };
      }
    }

    if (name) banquet.name = name;
    if (capacity) banquet.capacity = capacity;
    if (pricePerHour) banquet.pricePerHour = pricePerHour;
    if (description) banquet.description = description;
    if (amenities) {
      banquet.amenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    }

    if (files.length > 0) {
      banquet.images = files.map(file => `/images/banquets/${file.filename}`);
    }

    await banquet.save();

    return {
      status: true,
      message: 'Banquet updated successfully',
      data: banquet
    };
  } catch (error) {
    console.error('Service Error - updateBanquet:', error);
    return { status: false, message: 'Failed to update banquet' };
  }
};


exports.deleteBanquet = async (req) => {
  try {
    const { hallId } = req.params;

    const banquet = await BANQUET.findById(hallId);
    if (!banquet) {
      return { status: false, message: 'Banquet not found' };
    }

    await BANQUET.findByIdAndDelete(hallId);

    return {
      status: true,
      message: 'Banquet deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteBanquet:', error);
    return {
      status: false,
      message: 'Failed to delete banquet'
    };
  }
};


exports.bookBanquet = async (req) => {
  try {
    const { hallId } = req.params;
    const {
      guestName,
      phone,
      eventDate,
      slot,
      endTime,
      totalAmount,
      paymentMode = 'offline',
      paymentMethod,
      startTime
    } = req.body;

    if (!guestName || !phone || !eventDate || !slot || !endTime || !totalAmount || !paymentMethod) {
      return { status: false, message: 'All fields are required for booking' };
    }

    const banquet = await BANQUET.findById(hallId);
    if (!banquet) {
      return { status: false, message: 'Banquet not found' };
    }

    let user = await USER.findOne({ phone });
    if (!user) {
      user = await USER.create({
        name: guestName,
        phone,
        email: null, 
        password: ''
      });
    }

    const booking = await BANQUETBOOKING.create({
      hallId: hallId,
      guestName,
      phone,
      eventDate,
      slot,
      endTime, 
      startTime,
      totalAmount,
      createdBy: 'admin',
      userId: user._id
    });

    const payment = await PAYMENT.create({
      bookingId: booking._id,
      amount: totalAmount,
      mode: paymentMode,
      method: paymentMethod,
      bookingType: 'banquet'
    });

    booking.paymentId = payment._id;
    await booking.save();

    return {
      status: true,
      message: 'Banquet booked successfully',
      data: {
        booking,
        payment
      }
    };
  } catch (error) {
    console.error('Service Error - bookBanquet:', error);
    return { status: false, message: 'Failed to book banquet' };
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


exports.getBanquetBookings = async (req) => {
  try {
    const { hallId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await BANQUETBOOKING.countDocuments({ hallId: hallId });

    const bookings = await BANQUETBOOKING.aggregate([
      { $match: { hallId: new mongoose.Types.ObjectId(hallId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'payments',
          localField: 'paymentId',
          foreignField: '_id',
          as: 'payment'
        }
      },
      { $unwind: { path: '$payment', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          guestName: 1,
          phone: 1,
          eventDate: 1,
          slot: 1,
          totalAmount: 1,
          status: 1,
          createdBy: 1,
          user: { _id: 1, name: 1, phone: 1, email: 1 },
          payment: {
            _id: 1,
            amount: 1,
            mode: 1,
            method: 1,
            status: 1,
            createdAt: 1
          }
        }
      }
    ]);

    return {
      status: true,
      message: 'Banquet bookings fetched successfully',
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    console.error('Service Error - getBanquetBookings:', error);
    return { status: false, message: 'Failed to get banquet bookings' };
  }
};


exports.cancelBanquetBooking = async (req) => {
  try {
    const { bookingId } = req.params;

    const booking = await BANQUETBOOKING.findById(bookingId);
    if (!booking) {
      return { status: false, message: 'Booking not found' };
    }

    if (booking.status === 'cancelled') {
      return { status: false, message: 'Booking is already cancelled' };
    }

    booking.status = 'cancelled';
    await booking.save();

    return {
      status: true,
      message: 'Banquet booking cancelled successfully',
      data: booking
    };
  } catch (error) {
    console.error('Service Error - cancelBanquetBooking:', error);
    return {
      status: false,
      message: 'Failed to cancel banquet booking'
    };
  }
};


exports.checkBanquetAvailability = async (req) => {
  try {
    const { hallId } = req.params; // hallId
    const { eventDate, slot } = req.query;

    if (!eventDate || !slot) {
      return { status: false, message: 'Event date and slot are required' };
    }

    const existingBooking = await BANQUETBOOKING.findOne({
      hallId: hallId,
      eventDate: new Date(eventDate),
      slot: slot,
      status: { $ne: 'cancelled' } // ignore cancelled
    });

    return {
      status: true,
      available: !existingBooking,
      message: existingBooking ? 'Slot not available' : 'Slot is available'
    };
  } catch (error) {
    console.error('Service Error - checkBanquetAvailability:', error);
    return {
      status: false,
      message: 'Failed to check banquet availability'
    };
  }
};

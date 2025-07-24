const TableBooking = require('../../models/tableBooking');
const MenuItem = require('../../models/menuItem');
const Table = require('../../models/tableModel');
const PAYMENT = require('../../models/paymentModel');
const User = require('../../models/userModel');

exports.createTableBooking = async (req) => {
  try {
    const {
      guestName,
      phone,
      date,
      startTime,
      endTime,
      numberOfGuests,
      specialRequest,
      preOrderedItems = [],
      paymentMode = 'offline',
      paymentMethod
    } = req.body;
    const { tableId } = req.params;

    // ✅ Required field validation
    if (!guestName || !phone || !date || !startTime || !endTime || !numberOfGuests || !tableId) {
      return { status: false, message: 'Missing required fields' };
    }

    const parsedDate = new Date(date);
    const parsedStartTime = new Date(startTime);
    const parsedEndTime = new Date(endTime);

    if (isNaN(parsedDate) || isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
      return { status: false, message: 'Invalid date/time format' };
    }

    // ✅ Check if table exists and is available
    const table = await Table.findById(tableId);
    if (!table || !table.isAvailable) {
      return { status: false, message: 'Selected table is not available' };
    }

    // ✅ Check for time conflict
    const conflict = await TableBooking.findOne({
      tableId,
      date: parsedDate,
      $or: [
        {
          startTime: { $lt: parsedEndTime },
          endTime: { $gt: parsedStartTime }
        }
      ],
      status: 'booked'
    });

    if (conflict) {
      return { status: false, message: 'Table is already booked for the selected time slot' };
    }

    // ✅ Create or find user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({
        firstname: guestName,
        lastname: '',
        phone,
        email: email || '',
        password: ''
      });
    }

    // ✅ Calculate total amount
    let totalAmount = 0;
    for (const item of preOrderedItems) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (menuItem) {
        totalAmount += menuItem.price * (item.quantity || 1);
      }
    }

    // ✅ Create Table Booking
    const booking = await TableBooking.create({
      guestName,
      tableId,
      userId: user._id,
      phone,
      date: parsedDate,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      numberOfGuests,
      specialRequest,
      preOrderedItems,
      totalAmount,
      status: 'booked',
      paymentStatus: 'paid',
      tableNumber: table.tableNumber
    });

    // ✅ Create Payment
    const payment = await PAYMENT.create({
      bookingId: booking._id,
      amount: totalAmount,
      mode: paymentMode,
      method: paymentMethod,
      status: 'paid',
      bookingType: 'table'
    });

    booking.paymentId = payment._id;
    await booking.save();

    return {
      status: true,
      message: 'Table booked successfully',
      data: { booking, payment }
    };

  } catch (error) {
    console.error('Service Error - createTableBooking:', error);
    return {
      status: false,
      message: 'Failed to book table',
      error: error.message
    };
  }
};


exports.getAllBookings = async () => {
  try {
    const bookings = await TableBooking.find()
      .populate('userId')
      .populate('preOrderedItems.menuItemId');

    return { status: true, data: bookings };
  } catch (error) {
    console.error('Service Error - getAllBookings:', error);
    return { status: false, message: 'Failed to fetch bookings', error: error.message };
  }
};

exports.updateBookingStatus = async (id, status) => {
  try {
    const updated = await TableBooking.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return { status: false, message: 'Booking not found' };
    }

    return { status: true, message: 'Status updated', data: updated };
  } catch (error) {
    console.error('Service Error - updateBookingStatus:', error);
    return { status: false, message: 'Failed to update booking status', error: error.message };
  }
};

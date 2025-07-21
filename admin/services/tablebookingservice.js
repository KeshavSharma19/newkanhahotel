const TableBooking = require('../../models/tableBooking');
const MenuItem = require('../../models/menuItem');

exports.createBooking = async (req) => {
  try {
    const {
      guestName, userId, phone, date, timeSlot, numberOfGuests,
      tableNumber, specialRequest, preOrderedItems
    } = req.body;

    if (!guestName || !phone || !date || !timeSlot || !numberOfGuests) {
      return { status: false, message: 'Required fields missing' };
    }

    let totalAmount = 0;

    if (preOrderedItems && preOrderedItems.length > 0) {
      for (const item of preOrderedItems) {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (menuItem) {
          totalAmount += menuItem.price * item.quantity;
        }
      }
    }

    const booking = await TableBooking.create({
      guestName,
      userId,
      phone,
      date,
      timeSlot,
      numberOfGuests,
      tableNumber,
      specialRequest,
      preOrderedItems,
      totalAmount
    });

    return { status: true, message: 'Booking successful', data: booking };

  } catch (error) {
    console.error('Service Error - createBooking:', error);
    return { status: false, message: 'Failed to create booking', error: error.message };
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

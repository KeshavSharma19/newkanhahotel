const HOTEL = require('../../models/hotelModel');

exports.createHotel = async (hotelData) => {
  try {
    const hotel = await HOTEL.create(hotelData);
    return {
      status: true,
      message: 'Hotel created successfully',
      data: hotel
    };
  } catch (error) {
    console.error('Service Error - createHotel:', error);
    return {
      status: false,
      message: 'Failed to create hotel'
    };
  }
};

exports.getAllHotels = async () => {
  try {
    const hotels = await HOTEL.find();
    return {
      status: true,
      message: 'Hotels retrieved successfully',
      data: hotels
    };
  } catch (error) {
    console.error('Service Error - getAllHotels:', error);
    return {
      status: false,
      message: 'Failed to retrieve hotels'
    };
  }
};

exports.getHotelById = async (hotelId) => {
  try {
    const hotel = await HOTEL.findById(hotelId);
    if (!hotel) {
      return {
        status: false,
        message: 'Hotel not found'
      };
    }
    return {
      status: true,
      message: 'Hotel retrieved successfully',
      data: hotel
    };
  } catch (error) {
    console.error('Service Error - getHotelById:', error);
    return {
      status: false,
      message: 'Failed to retrieve hotel'
    };
  }
};

exports.updateHotel = async (hotelId, updateData) => {
  try {
    const hotel = await HOTEL.findByIdAndUpdate(hotelId, updateData, { new: true });
    if (!hotel) {
      return { status: false, message: 'Hotel not found' };
    }
    return {
      status: true,
      message: 'Hotel updated successfully',
      data: hotel
    };
  } catch (error) {
    console.error('Service Error - updateHotel:', error);
    return {
      status: false,
      message: 'Failed to update hotel'
    };
  }
};

exports.deleteHotel = async (hotelId) => {
  try {
    const hotel = await HOTEL.findByIdAndDelete(hotelId);
    if (!hotel) {
      return { status: false, message: 'Hotel not found' };
    }
    return {
      status: true,
      message: 'Hotel deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteHotel:', error);
    return {
      status: false,
      message: 'Failed to delete hotel'
    };
  }
};
const Banquet = require('../../models/banquetModel');

exports.viewBanquetList = async (req) => {
  try {
    const banquetList = await Banquet.find({})
      .select('-__v')
      .sort({ createdAt: -1 });

    const formattedList = banquetList.map((banquet) => ({
      _id: banquet._id,
      name: banquet.name,
      capacity: banquet.capacity,
      description: banquet.description,
      price: banquet.price,
      images: banquet.images?.map(img => `${process.env.BASE_URL || ''}/${img}`) || [],
      isAvailable: banquet.isAvailable,
      createdAt: banquet.createdAt,
      updatedAt: banquet.updatedAt,
      amenities: banquet.amenities || []
    }));

    return {
      status: true,
      message: 'Banquet halls fetched successfully',
      data: formattedList
    };

  } catch (error) {
    console.error('Service Error - viewBanquetList:', error);
    return {
      status: false,
      message: 'Failed to fetch banquet list',
      error: error.message
    };
  }
};


exports.BanquetTypeById = async (id) => {
  try {
    const room = await Banquet.findById(id, { createdAt: 0, updatedAt: 0 });
    if (!room) {
      return {
        status: false,
        message: 'Banquet not found'
      };
    }
    return {
      status: true,
      message: 'Banquet fetched successfully',
      data: room
    };
  } catch (error) {
    console.error('Service Error - getRoomById:', error);
    return {
      status: false,
      message: 'Failed to fetch room'
    };
  }
};
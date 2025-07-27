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
      images: banquet.images?.map(img => `${process.env.BASE_URL || ''}/uploads/${img}`) || [],
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

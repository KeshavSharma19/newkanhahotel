const Table = require('../../models/tableModel');

exports.viewTableList = async (req) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    const tables = await Table.find({ isAvailable: true });

    const formattedTables = tables.map(table => ({
      _id: table._id,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      description: table.description,
      images: table.images?.map(img => `${baseUrl}${img}`) || [],
      createdAt: table.createdAt
    }));

    return {
      status: true,
      message: 'Tables fetched successfully',
      data: formattedTables
    };
  } catch (error) {
    console.error('Service Error - getAllTablesForUser:', error);
    return {
      status: false,
      message: 'Failed to fetch tables',
      error: error.message
    };
  }
};

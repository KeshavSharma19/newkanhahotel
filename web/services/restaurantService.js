const Table = require('../../models/tableModel');
const Category = require('../../models/category');
const MenuItem = require('../../models/menuItem');

exports.getFullMenuForUser = async (req) => {
  try {
    // Step 1: Get all active categories
    const categories = await Category.find({ isActive: true });

    // Step 2: For each category, fetch its available items
    const menuData = await Promise.all(
      categories.map(async (category) => {
        const items = await MenuItem.find({
          categoryId: category._id,
          isAvailable: true
        }).select('name description price'); // Exclude image field

        return {
          _id: category._id,
          name: category.name,
          description: category.description,
          items
        };
      })
    );

    return {
      status: true,
      message: 'Menu fetched successfully',
      data: menuData
    };
  } catch (error) {
    console.error('Service Error - getFullMenuForUser:', error);
    return {
      status: false,
      message: 'Failed to fetch menu',
      error: error.message
    };
  }
};


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

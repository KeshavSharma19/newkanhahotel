const Table = require('../../models/tableModel');

exports.createTable = async (req) => {
  try {
    const { tableNumber, capacity, description } = req.body;
    const type = req.query.type; // e.g., 'table'

    if (!tableNumber || !capacity) {
      return { status: false, message: 'Table number and capacity are required' };
    }

    const exists = await Table.findOne({ tableNumber });
    if (exists) {
      return { status: false, message: 'Table with this number already exists' };
    }

    // Store image paths as 'type/filename'
    const images = req.files?.map(file => {
      return type ? `/${type}/${file.filename}` : file.filename;
    }) || [];

    const table = await Table.create({
      tableNumber,
      capacity,
      description,
      images
    });

    return { status: true, message: 'Table created successfully', data: table };
  } catch (error) {
    console.error('Service Error - createTable:', error);
    return { status: false, message: 'Failed to create table', error: error.message };
  }
};


exports.getAllTables = async () => {
  try {
    const baseUrl = process.env.BASE_URL;

    const tables = await Table.find();

    const formattedTables = tables.map(table => {
      return {
        ...table._doc,
        images: table.images?.map(img => baseUrl + img) || []
      };
    });

    return {
      status: true,
      message: 'Tables fetched successfully',
      data: formattedTables
    };
  } catch (error) {
    console.error('Service Error - getAllTables:', error);
    return {
      status: false,
      message: 'Failed to fetch tables',
      error: error.message
    };
  }
};


exports.getTableById = async (req) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id);
    if (!table) {
      return { status: false, message: 'Table not found' };
    }
    return { status: true, message: 'Table fetched successfully', data: table };
  } catch (error) {
    console.error('Service Error - getTableById:', error);
    return { status: false, message: 'Failed to fetch table', error: error.message };
  }
};

exports.updateTable = async (req) => {
  try {
    const { id } = req.params;
    const type = req.query.type; // e.g., 'table'

    const existing = await Table.findById(id);
    if (!existing) {
      return { status: false, message: 'Table not found' };
    }

    // Prepend type to new image filenames
    const newImages = req.files?.map(file =>
      type ? `${type}/${file.filename}` : file.filename
    ) || [];

    const updatedData = {
      ...req.body,
      images: [...existing.images, ...newImages]
    };

    const updated = await Table.findByIdAndUpdate(id, updatedData, { new: true });

    return {
      status: true,
      message: 'Table updated successfully',
      data: updated
    };
  } catch (error) {
    console.error('Service Error - updateTable:', error);
    return {
      status: false,
      message: 'Failed to update table',
      error: error.message
    };
  }
};


exports.deleteTable = async (req) => {
  try {
    const { id } = req.params;
    const deleted = await Table.findByIdAndDelete(id);
    if (!deleted) {
      return { status: false, message: 'Table not found or already deleted' };
    }
    return { status: true, message: 'Table deleted successfully' };
  } catch (error) {
    console.error('Service Error - deleteTable:', error);
    return { status: false, message: 'Failed to delete table', error: error.message };
  }
};

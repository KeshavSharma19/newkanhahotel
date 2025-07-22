const Table = require('../../models/tableModel');

exports.createTable = async (req) => {
  try {
    const { tableNumber, capacity, description } = req.body;

    if (!tableNumber || !capacity) {
      return { status: false, message: 'Table number and capacity are required' };
    }

    const exists = await Table.findOne({ tableNumber });
    if (exists) {
      return { status: false, message: 'Table with this number already exists' };
    }

    const table = await Table.create({
      tableNumber,
      capacity,
      description
    });

    return { status: true, message: 'Table created successfully', data: table };
  } catch (error) {
    console.error('Service Error - createTable:', error);
    return { status: false, message: 'Failed to create table', error: error.message };
  }
};

exports.getAllTables = async () => {
  try {
    const tables = await Table.find();
    return { status: true, message: 'Tables fetched successfully', data: tables };
  } catch (error) {
    console.error('Service Error - getAllTables:', error);
    return { status: false, message: 'Failed to fetch tables', error: error.message };
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
    const updated = await Table.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return { status: false, message: 'Table not found or update failed' };
    }
    return { status: true, message: 'Table updated successfully', data: updated };
  } catch (error) {
    console.error('Service Error - updateTable:', error);
    return { status: false, message: 'Failed to update table', error: error.message };
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

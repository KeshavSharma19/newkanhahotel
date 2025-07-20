const MenuItem = require('../../models/menuItem');
const mongoose = require('mongoose');

exports.createItem = async (req) => {
  try {
    const { name, description, price } = req.body;
    const { categoryId } = req.params;

    if (!name || !price || !categoryId) {
      return { status: false, message: 'Required fields missing' };
    }

    // Check if item already exists in this category (case-insensitive)
    const existing = await MenuItem.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      categoryId
    });

    if (existing) {
      return { status: false, message: 'Item with same name already exists in this category' };
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      categoryId
    });

    return {
      status: true,
      message: 'Menu item created successfully',
      data: item
    };
  } catch (error) {
    console.error('Service Error - createItem:', error);
    return { status: false, message: 'Failed to create item', error: error.message };
  }
};


exports.getItems = async () => {
  try {
    const items = await MenuItem.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return { status: true, data: items };
  } catch (error) {
    console.error('Service Error - getItems:', error);
    return { status: false, message: 'Failed to fetch items' };
  }
};


exports.getItemsByCategory = async (req) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return { status: false, message: 'Invalid category ID' };
    }

    const items = await MenuItem.aggregate([
      {
        $match: {
          categoryId: new mongoose.Types.ObjectId(categoryId),
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return { status: true, data: items };
  } catch (error) {
    console.error('Service Error - getItemsByCategory:', error);
    return { status: false, message: 'Failed to fetch category items' };
  }
};


exports.updateItem = async (req) => {
  try {
    const { id } = req.params;

    // Validate item ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: false, message: 'Invalid item ID' };
    }

    const updateData = {};
    const allowedFields = ['name', 'description', 'price', 'categoryId', 'isAvailable'];

    // Only allow specific fields to be updated
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const item = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

    if (!item) {
      return { status: false, message: 'Item not found' };
    }

    return {
      status: true,
      message: 'Item updated successfully',
      data: item
    };
  } catch (error) {
    console.error('Service Error - updateItem:', error);
    return { status: false, message: 'Failed to update item', error: error.message };
  }
};


exports.deleteItem = async (req) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: false, message: 'Invalid item ID' };
    }

    const result = await MenuItem.findByIdAndDelete(id);
    if (!result) {
      return { status: false, message: 'Menu item not found or already deleted' };
    }

    return {
      status: true,
      message: 'Menu item deleted successfully',
      data: result
    };
  } catch (error) {
    console.error('Service Error - deleteItem:', error);
    return {
      status: false,
      message: 'Failed to delete menu item',
      error: error.message
    };
  }
};

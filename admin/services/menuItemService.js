const MenuItem = require('../../models/menuItem');

exports.createItem = async (req) => {
  try {
    const { name, description, price, categoryId } = req.body;
    if (!name || !price || !categoryId) return { status: false, message: 'Required fields missing' };

    const item = await MenuItem.create({ name, description, price, categoryId });
    return { status: true, message: 'Menu item created', data: item };
  } catch (error) {
    return { status: false, message: 'Failed to create item' };
  }
};

exports.getItems = async () => {
  try {
    const items = await MenuItem.find().populate('categoryId');
    return { status: true, data: items };
  } catch (error) {
    return { status: false, message: 'Failed to fetch items' };
  }
};

exports.getItemsByCategory = async (req) => {
  try {
    const items = await MenuItem.find({ categoryId: req.params.id });
    return { status: true, data: items };
  } catch (error) {
    return { status: false, message: 'Failed to fetch category items' };
  }
};

exports.updateItem = async (req) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return { status: false, message: 'Item not found' };

    return { status: true, message: 'Item updated', data: item };
  } catch (error) {
    return { status: false, message: 'Failed to update item' };
  }
};

exports.deleteItem = async (req) => {
  try {
    const result = await MenuItem.findByIdAndDelete(req.params.id);
    if (!result) return { status: false, message: 'Item not found' };

    return { status: true, message: 'Item deleted' };
  } catch (error) {
    return { status: false, message: 'Failed to delete item' };
  }
};

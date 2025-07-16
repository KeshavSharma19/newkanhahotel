const Category = require('../../models/category');

exports.createCategory = async (req) => {
  try {
    if (!req.body) {
      return { status: false, message: 'Invalid request body' };
    }
    const { name } = req.body;
    console.log('Service - createCategory:', req.body);
    if (!name) return { status: false, message: 'Category name is required' };

    const category = await Category.create({ name });
    return { status: true, message: 'Category created', data: category };
  } catch (error) {
    console.error('Service Error - createCategory:', error);
    return { status: false, message: 'Failed to create category', error: error.message };
  }
};

exports.getCategories = async () => {
  try {
    const categories = await Category.find();
    return { status: true, data: categories };
  } catch (error) {
    return { status: false, message: 'Failed to fetch categories' };
  }
};

exports.updateCategory = async (req) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return { status: false, message: 'Category not found' };

    return { status: true, message: 'Category updated', data: category };
  } catch (error) {
    return { status: false, message: 'Failed to update category' };
  }
};

exports.deleteCategory = async (req) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result) return { status: false, message: 'Category not found' };

    return { status: true, message: 'Category deleted' };
  } catch (error) {
    return { status: false, message: 'Failed to delete category' };
  }
};

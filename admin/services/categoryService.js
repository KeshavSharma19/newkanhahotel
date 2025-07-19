const Category = require('../../models/category');
const MenuItem = require('../../models/menuItem');
const mongoose = require('mongoose');

exports.createCategory = async (req) => {
  try {
    if (!req.body) {
      return { status: false, message: 'Invalid request body' };
    }

    const { name, description } = req.body;
    console.log('Service - createCategory:', req.body);

    if (!name) {
      return { status: false, message: 'Category name is required' };
    }

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp('^' + name + '$', 'i') }
    });

    if (existingCategory) {
      return { status: false, message: 'Category already exists' };
    }

    const category = await Category.create({ name, description });

    return {
      status: true,
      message: 'Category created successfully',
      data: category
    };
  } catch (error) {
    console.error('Service Error - createCategory:', error);
    return {
      status: false,
      message: 'Failed to create category',
      error: error.message
    };
  }
};

exports.getCategories = async () => {
  try {
    const categories = await Category.find();
    return { 
      status: true, 
      message: 'Categories fetched successfully',
      data: categories 
    };
  } catch (error) {
    return { status: false, message: 'Failed to fetch categories' };
  }
};


exports.updateCategory = async (req) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: false, message: 'Invalid category ID' };
    }

    if (!name) {
      return { status: false, message: 'Category name is required' };
    }

    // Check for duplicate name in other categories (case-insensitive)
    const existing = await Category.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp('^' + name + '$', 'i') }
    });

    if (existing) {
      return {
        status: false,
        message: 'Another category with this name already exists'
      };
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return { status: false, message: 'Category not found' };
    }

    return { status: true, message: 'Category updated successfully', data: category };
  } catch (error) {
    console.error('Service Error - updateCategory:', error);
    return { status: false, message: 'Failed to update category', error: error.message };
  }
};


exports.deleteCategory = async (req) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: false, message: 'Invalid category ID' };
    }

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return { status: false, message: 'Category not found' };
    }

    // Check for related menu items
    const itemCount = await MenuItem.countDocuments({ categoryId: id });
    console.log('Item count for category:', itemCount);
    
    if (itemCount > 0) {
      return {
        status: false,
        message: 'Cannot delete category with existing menu items. Please delete all items under this category first.'
      };
    }

    // Safe to delete
    await Category.findByIdAndDelete(id);

    return {
      status: true,
      message: 'Category deleted successfully'
    };
  } catch (error) {
    console.error('Service Error - deleteCategory:', error);
    return {
      status: false,
      message: 'Failed to delete category',
      error: error.message
    };
  }
}

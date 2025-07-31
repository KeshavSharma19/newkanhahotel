const Blog = require('../../models/blogModel');

exports.createBlog = async (req) => {
  try {
    const { title, slug, content } = req.body;

    if (!title || !slug || !content) {
      return { status: false, message: 'Title, slug, and content are required' };
    }

    const exists = await Blog.findOne({ slug });
    if (exists) {
      return { status: false, message: 'Blog with this slug already exists' };
    }

    const thumbnail = req.file?.filename || '';

    const blog = await Blog.create({
      title,
      slug,
      content,
      thumbnail,
      createdBy: req.user?.id || null
    });

    return { status: true, message: 'Blog created successfully', data: blog };
  } catch (error) {
    console.error('Create Blog Error:', error);
    return { status: false, message: 'Failed to create blog', error: error.message };
  }
};

exports.getAllBlogs = async () => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return { status: true, message: 'Blogs fetched successfully', data: blogs };
  } catch (error) {
    console.error('Get Blogs Error:', error);
    return { status: false, message: 'Failed to fetch blogs', error: error.message };
  }
};

exports.updateBlog = async (req) => {
  try {
    const { id } = req.params;

    const existing = await Blog.findById(id);
    if (!existing) {
      return { status: false, message: 'Blog not found' };
    }

    const updatedData = {
      ...req.body,
      tags: req.body.tags?.split(',') || existing.tags
    };

    if (req.file?.filename) {
      updatedData.thumbnail = req.file.filename;
    }

    const updated = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    return { status: true, message: 'Blog updated successfully', data: updated };
  } catch (error) {
    console.error('Update Blog Error:', error);
    return { status: false, message: 'Failed to update blog', error: error.message };
  }
};

exports.deleteBlog = async (req) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return { status: false, message: 'Blog not found or already deleted' };
    }
    return { status: true, message: 'Blog deleted successfully' };
  } catch (error) {
    console.error('Delete Blog Error:', error);
    return { status: false, message: 'Failed to delete blog', error: error.message };
  }
};

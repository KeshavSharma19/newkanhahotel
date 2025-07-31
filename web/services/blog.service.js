const Blog = require('../../models/blogModel');

exports.allPublishedBlogs = async (req) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

    const blogsWithThumbnails = blogs.map(blog => ({
      ...blog,
      thumbnail: blog.thumbnail ? `${BASE_URL}/uploads/blogs/${blog.thumbnail}` : ''
    }));

    return {
      status: true,
      message: 'Published blogs fetched successfully',
      data: blogsWithThumbnails
    };
  } catch (error) {
    console.error('Service Error - getPublishedBlogs:', error);
    return { status: false, message: 'Failed to fetch blogs', error: error.message };
  }
};

exports.blogDetails = async (req) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({ _id: id, isPublished: true })
      .select('-__v')
      .lean();

    if (!blog) {
      return { status: false, message: 'Blog not found or not published' };
    }

    const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

    blog.thumbnail = blog.thumbnail ? `${BASE_URL}/uploads/blogs/${blog.thumbnail}` : '';

    return {
      status: true,
      message: 'Blog details fetched successfully',
      data: blog
    };
  } catch (error) {
    console.error('Service Error - blogDetails:', error);
    return { status: false, message: 'Failed to fetch blog details', error: error.message };
  }
};



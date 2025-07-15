const GALLERY = require('../../models/galleryModel');

exports.addGalleryImage = async (req) => {
  try {
    const { title, description, type } = req.body;
    const file = req.file;

    if (!title || !file) {
      return { status: false, message: 'Title and image are required' };
    }

    const imagePath = `/images/gallery/${file.filename}`;

    const image = await GALLERY.create({
      title,
      description,
      type,
      image: imagePath,
      uploadedBy: 'admin'
    });

    return {
      status: true,
      message: 'Image uploaded successfully',
      data: image
    };
  } catch (error) {
    console.error('Error - addGalleryImage:', error);
    return { status: false, message: 'Failed to upload image' };
  }
};


exports.getGalleryImages = async (req) => {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const images = await GALLERY.find(filter).sort({ createdAt: -1 });

    // prepend BASE_URL to each image path
    const baseUrl = process.env.BASE_URL || '';
    const updatedImages = images.map(img => ({
      ...img._doc,
      image: `${baseUrl}${img.image}`
    }));

    return {
      status: true,
      message: 'Gallery images fetched successfully',
      data: updatedImages
    };
  } catch (error) {
    console.error('Error - getGalleryImages:', error);
    return { status: false, message: 'Failed to fetch gallery images' };
  }
};


exports.updateGalleryImage = async (req) => {
  try {
    const { imageId } = req.params;
    const { title, description, type } = req.body;
    const file = req.file;

    const updateData = { title, description, type };

    if (file) {
      updateData.image = `/images/gallery/${file.filename}`;
    }

    const updated = await GALLERY.findByIdAndUpdate(imageId, updateData, {
      new: true
    });

    if (!updated) {
      return { status: false, message: 'Image not found' };
    }

    return {
      status: true,
      message: 'Gallery image updated',
      data: updated
    };
  } catch (error) {
    console.error('Error - updateGalleryImage:', error);
    return { status: false, message: 'Failed to update gallery image' };
  }
};

exports.deleteGalleryImage = async (req) => {
  try {
    const { imageId } = req.params;

    const deleted = await GALLERY.findByIdAndDelete(imageId);
    if (!deleted) {
      return { status: false, message: 'Image not found' };
    }

    return { status: true, message: 'Image deleted successfully' };
  } catch (error) {
    console.error('Error - deleteGalleryImage:', error);
    return { status: false, message: 'Failed to delete image' };
  }
};

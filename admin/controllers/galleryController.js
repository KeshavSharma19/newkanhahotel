const galleryService = require('../services/galleryService');

exports.addGalleryImage = async (req, res) => {
  try {
    const result = await galleryService.addGalleryImage(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.getGalleryImages = async (req, res) => {
  try {
    const result = await galleryService.getGalleryImages(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.updateGalleryImage = async (req, res) => {
  try {
    const result = await galleryService.updateGalleryImage(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.deleteGalleryImage = async (req, res) => {
  try {
    const result = await galleryService.deleteGalleryImage(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}
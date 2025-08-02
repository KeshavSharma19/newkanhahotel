const galleryService = require('../services/gallery.service');

exports.viewgallery = async (req, res) => {
  try {
    const result = await galleryService.viewgallery(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Submit Enquiry  error:', error);
    res.status(500).json({ status: false, message: 'Server error while Submiting  Enquiry' });
  }
};
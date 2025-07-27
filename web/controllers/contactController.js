const contactService = require('../services/contactService');

exports.submitEnquiry = async (req, res) => {
  try {
    const result = await contactService.submitEnquiry(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Submit Enquiry  error:', error);
    res.status(500).json({ status: false, message: 'Server error while Submiting  Enquiry' });
  }
};
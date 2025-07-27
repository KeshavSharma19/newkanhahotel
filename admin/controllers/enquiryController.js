const enquiryService = require('../services/enquiryService');
exports.getAllEnquiries = async (req, res) => {
  try {
    const result = await enquiryService.getAllEnquiries();
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getAllEnquiries:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const result = await enquiryService.updateEnquiryStatus(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateEnquiryStatus:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

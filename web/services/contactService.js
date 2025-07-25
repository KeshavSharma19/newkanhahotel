// services/enquiryService.js
const Enquiry = require('../../models/enquiryModel');

exports.submitEnquiry = async (req) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return { status: false, message: 'Name, email, phone and message are required' };
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message
    });

    return {
      status: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    };
  } catch (error) {
    console.error('Service Error - submitEnquiry:', error);
    return {
      status: false,
      message: 'Failed to submit enquiry',
      error: error.message
    };
  }
};

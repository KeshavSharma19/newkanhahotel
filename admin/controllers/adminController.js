const adminService = require('../services/adminService');

exports.adminSignup = async (req, res) => {
  try {
    const result = await adminService.adminSignup(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.adminSignin = async (req, res) => {
  try {
    const result = await adminService.adminSignin(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.adminForgetPassword = async (req, res) => {
  try {
    const result = await adminService.adminForgetPassword(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.adminChangeImage = async (req, res) => {
  try {
    const result = await adminService.adminChangeImage({
      body: { adminId: req.body.adminId },
      file: req.file
    });
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Change Image Error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    const result = await adminService.adminLogout(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
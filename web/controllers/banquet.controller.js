const banquetService = require('../services/banquet.service');

exports.viewBanquetList = async (req, res) => {
  try {
    const result = await banquetService.viewBanquetList(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};
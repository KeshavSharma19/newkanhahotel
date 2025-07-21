const authService = require('../services/auth.services');

const registerUser = async (req, res) => {
    const result = await authService.register(req);
    res.status(result.status ? 200 : 400).json(result);
};

// Login a user
const loginUser = async (req, res) => {

    const result = await authService.login(req);
    res.status(result.status ? 200 : 400).json(result);

};

const loginStudentWithMobile = async (req, res) => {

    const result = await authService.loginStudentWithMobile(req);
    res.status(result.status ? 200 : 400).json(result);

};

const mobileVerifyOtp = async (req, res) => {

    const result = await authService.mobileVerifyOtp(req);
    res.status(result.status ? 200 : 400).json(result);
 
};


module.exports = { registerUser, loginUser, loginStudentWithMobile, mobileVerifyOtp };

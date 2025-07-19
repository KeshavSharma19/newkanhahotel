const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginStudentWithMobile, mobileVerifyOtp } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/mobile-login", loginStudentWithMobile);
router.post("/mobile-verify-otp", mobileVerifyOtp);

module.exports = router;
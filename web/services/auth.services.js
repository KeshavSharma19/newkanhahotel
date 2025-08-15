const User = require('../../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.register = async (req) => {
  try {
    if (!req.body) {
      return { status: false, message: 'Request body is missing' };
    }

    const { firstname, lastname, email, password, phone } = req.body;

    if (!firstname || !email || !password || !phone) {
      return { status: false, message: 'All fields are required' };
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Convert phone to number and validate
    const phoneNumber = Number(phone);
    if (isNaN(phoneNumber) || phoneNumber.toString().length < 10) {
      return { status: false, message: 'Invalid phone number' };
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: trimmedEmail });
    if (existingEmail) {
      return { status: false, message: 'Email already registered' };
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone: phoneNumber });
    if (existingPhone) {
      return { status: false, message: 'Phone number already registered' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      firstname: firstname.trim(),
      lastname: lastname?.trim() || '',
      email: trimmedEmail,
      password: hashedPassword,
      phone: phoneNumber,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.firstname + ' ' + user.lastname,
        email: user.email,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    user.token = token;
    await user.save();

    return {
      status: true,
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.firstname + ' ' + user.lastname,
        email: user.email,
        phone: user.phone,
      },
    };
  } catch (err) {
    console.error('Service Error - register:', err);
    return { status: false, message: 'Server error', error: err.message };
  }
};

exports.login = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // return res.status(400).json({ msg: "Please enter email and password" });
        return { status: false, message: 'Please enter email and password' };
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return { status: false, message: 'Please Sign up first.' };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return { status: false, message: 'Invalid Password' };


        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: "7d",
        // });

        return {
            status: true,
            message: 'Login successful',
            token: user.token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        };
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.loginStudentWithMobile = async (req) => {
    const { mobileNumber, countryCode = "+91" } = req.body;

    if (!mobileNumber) {
        return { status: false, message: 'Mobile number is required' };
    }

    try {
        const otp = process.env.OTPENV === "LOCAL"
            ? "123456"
            : crypto.randomInt(100000, 999999).toString();

        const fullPhoneNumber = `${countryCode.replace('+', '')}${mobileNumber}`;

        let user = await User.findOne({ phone: mobileNumber });

        if (!user) {
            user = new User({
                phone: mobileNumber,
                otp,
                name: "New User",
            });
        } else {
            user.otp = otp;
        }

        await user.save();

        // 🔥 Send OTP via MSG91
        if (process.env.OTPENV !== "LOCAL") {
            const msg91Response = await axios.post(
                'https://control.msg91.com/api/v5/otp',
                {
                    template_id: process.env.YOUR_MSG91_TEMPLATE_ID, // Replace this with your actual template ID
                    mobile: fullPhoneNumber,
                    authkey: process.env.MSG91_AUTH_KEY, // keep this in your .env
                    otp,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('MSG91 Response:', msg91Response.data);
        }

        return {
            status: true,
            message: 'OTP sent successfully',
            phone: mobileNumber,
        };

    } catch (err) {
        console.error("Login Error:", err);
        return { status: false, message: 'Server error' };
    }
};


exports.mobileVerifyOtp = async (req) => {
    const { phone, otp } = req.body;

    let user;

    try {
        user = await User.findOne({ phone });
        console.log("useruseruser", user);

        if (!user) {
            return { status: false, message: 'user not found' };
        }

        if (!user.otp) {
            return { status: false, message: 'OTP not generated' };
        }

        if (user.otp != otp) {
            return { status: false, message: 'Invalid OTP' };

        }

        user.otp = null;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1y",
        });
        await user.save();

        return {
            status: true,
            message: 'user loggedIn successfully',
            token,
            user
        };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Server error' };
    }
};

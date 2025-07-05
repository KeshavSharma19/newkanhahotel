const ADMIN = require('../../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.adminSignup = async (req) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return {
        status: false,
        message: 'All fields are required'
      };
    }

    const existingAdmin = await ADMIN.findOne({ email });
    if (existingAdmin) {
      return {
        status: false,
        message: 'Admin already exists. Please login instead.'
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await ADMIN.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    const adminData = {
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      phone: newAdmin.phone
    };

    return {
      status: true,
      message: 'Admin registered successfully.',
      data: adminData
    };

  } catch (error) {
    console.error('Service Error - adminSignup:', error);
    return {
      status: false,
      message: 'Something went wrong, please try again later.'
    };
  }
};


exports.adminSignin = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return { status: false, message: 'Email and password are required' };
    }

    const admin = await ADMIN.findOne({ email });
    if (!admin) {
      return { status: false, message: 'Admin not found' };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { status: false, message: 'Incorrect password' };
    }

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: '1d' });

    // Save token in DB
    admin.token = token;
    await admin.save();

    return {
      status: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone
        }
      }
    };
  } catch (error) {
    console.error('Service Error - adminSignin:', error);
    return {
      status: false,
      message: 'Something went wrong, please try again later.'
    };
  }
};


exports.adminForgetPassword = async (req) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return { status: false, message: 'Email and new password are required' };
    }

    const admin = await ADMIN.findOne({ email });
    if (!admin) {
      return { status: false, message: 'Admin not found' };
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    return { status: true, message: 'Password updated successfully' };
  } catch (error) {
    console.error('Service Error - adminForgetPassword:', error);
    return {
      status: false,
      message: 'Something went wrong while updating password'
    };
  }
};


exports.adminChangeImage = async (req) => {
  try {
    const adminId = req.adminId;
    const file = req.file;

    if (!adminId || !file) {
      return { status: false, message: 'Admin ID and image file are required' };
    }

    const admin = await ADMIN.findById(adminId);
    if (!admin) {
      return { status: false, message: 'Admin not found' };
    }

    const imagePath = `/images/${file.filename}`; 
    admin.profileImage = imagePath;
    await admin.save();

    return {
      status: true,
      message: 'Profile image updated',
      data: { image: imagePath }
    };
  } catch (error) {
    console.error('Service Error - adminChangeImage:', error);
    return {
      status: false,
      message: 'Something went wrong while updating profile image'
    };
  }
};


exports.adminLogout = async (req) => {
  try {
    const adminId = req.adminId;

    const admin = await ADMIN.findById(adminId);
    if (!admin) {
      return { status: false, message: 'Admin not found' };
    }

    admin.token = null;
    await admin.save();

    return { status: true, message: 'Logout successful.' };
  } catch (error) {
    console.error('Service Error - adminLogout:', error);
    return {
      status: false,
      message: 'Something went wrong, please try again later.'
    };
  }
};



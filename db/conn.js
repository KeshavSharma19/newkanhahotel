const mongoose = require('mongoose');

console.log(process.env.MONGO_URI)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/newkanhahotel';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;

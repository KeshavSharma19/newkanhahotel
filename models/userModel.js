const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      // required: true,
      trim: true
    },
     lastname: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true,
      trim: true,
      sparse: true // Allows multiple users with no email,
    },

    phone: {
      type: String,
      required: true
    },

    password: {
      type: String,
      // required: true,
      // minlength: 6
    },
    otp: {
      type: Number
    },
    token: {
      type: String // for JWT storage if needed (optional)
    },

    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("User", userSchema);

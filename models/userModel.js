const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true
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

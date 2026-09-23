const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    age: {
      type: Number,
      min: 18,
      max: 60,
    },

    subject: {
      type: String,
      default: "Full Stack Development",
    },

    married: {
      type: Boolean,
      default: false,
    },

    weight: {
      type: Number,
      default: 0,
    },

    degrees: [
      {
        type: String,
      },
    ],

    address: {
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
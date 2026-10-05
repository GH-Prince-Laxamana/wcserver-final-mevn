const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Student Schema with strict validation
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: Number,
      required: [true, "Student contact phone number is required"],
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v.toString().length >= 7;
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Must be at least 7 digits.`,
      },
    },
  },
  {
    collection: "students",
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not Valid!");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [7, "Password must be 7 characters long"],
    select: false,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Please enter a different password");
      }
    },
  },
});
userSchema.pre("save", function (next) {
  console.log(this.isModified('password'));

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

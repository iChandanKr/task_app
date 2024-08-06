const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password and ConfirmPassword doesn't match",
    },
  },
  passwordChangedAt: Date,
});

// userSchema.virtual('tasks',{
//   ref:'Task',
//   localField:'_id',
//   foreignField:'user'
// })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  entredPassword,
  passwordInDb
) {
  return await bcrypt.compare(entredPassword, passwordInDb);
};

userSchema.methods.isPasswordChanged = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordchangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(jwtTimeStamp, passwordchangedTimeStamp);
    return passwordchangedTimeStamp > jwtTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

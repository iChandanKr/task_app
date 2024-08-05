const User = require("../model/userModel");
const createSendRes = require("../utils/sendRes");
const customError = require("../utils/customError");

const filteredReqObj = (obj, ...allowedFields) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};

// ---------- CREATE USER ---------------

exports.createNewUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // res.status(201).json({
    //   status: "Success",
    //   data: {
    //     sendUser,
    //   },
    // });
    createSendRes(res, 201, user);
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------- LOGIN USER -----------
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // checking the user with provided email exitsts or not
  if (!email || !password) {
    const err = new customError(
      "Please enter email and password to login...",
      400
    );
   return next(err);
  }

  // validating email and password;
  const user = await User.findOne({ email }).select("+password");
  let isMatched = false;
  if (user) {
    isMatched = await user.comparePassword(password, user.password);
  }
  if (!user || !isMatched) {
    const err = new customError("Entered email or password is incorrect", 401);
    return next(err);
  }

  createSendRes(res,200,user)

 
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findById(id);
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.password || req.body.confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "You can't update password using this resource",
    });
  }

  const filteredReq = filteredReqObj(req.body, "name", "age", "email");
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, filteredReq, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.updatePassword = async(req,res,next)=>{

  const {currentPassword,newPassword,confirmPassword} = req.body;

  const user  = await User.findById(req.user._id).select('+password');

  const isMatched = user.comparePassword(currentPassword,user.password);
  if(isMatched){
    if(newPassword === confirmPassword){
      user.password = newPassword;
      user.confirmPassword = confirmPassword;
      user.passwordChangedAt = Date.now();
      await user.save();
      res.status(200).json({
        status:"success",
        message:"Password updated successfully"
      })
    }
    else{
      const err = new customError('password and confirmPassword doesn\'t match!',400);
      next(err);
    }
  }
  else{
    const err = new customError('you have entered a wrong password',401);
      next(err);
  }
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
    });
  }
};


// exports.logout = async(req,res)=>{
//  res.status(200).send({

//  })
// }

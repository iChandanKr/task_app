const User = require("../model/userModel");

exports.createNewUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
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
  const id = req.params.id;
  const fieldsToUpdate = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

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

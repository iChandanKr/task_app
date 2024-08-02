const User = require("../model/userModel");

exports.createNewUser = async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
};

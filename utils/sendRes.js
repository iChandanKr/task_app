const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id}, "Chandan", {
    expiresIn: 10 * 24 * 60 * 60,
  });
};

module.exports = (res, statusCode, user) => {
  const token = signToken(user._id);
  const sendUser = JSON.parse(JSON.stringify(user));
  delete sendUser.password;
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user: sendUser,
    },
  });
};

const jwt = require("jsonwebtoken");
const util = require("util");
const customError = require("./customError");
const User = require("../model/userModel");

module.exports = async (req, res, next) => {
  // read the token and check if it exists
  const testToken = req.headers.authorization;
  let receivedToken;

  if (testToken && testToken.startsWith("Bearer")) {
    receivedToken = testToken.split(" ")[1];
  }
  if (!receivedToken) {
    const err = new customError("You are not loggedIn", 401);
    return next(err);
  }

  // verify token
  const verifyToken = util.promisify(jwt.verify);
  const decodedToken = await verifyToken(receivedToken, "Chandan");

  // checking if user with decoded token exists

  const user = await User.findById(decodedToken.id);
  if (!user) {
    const error = new customError("user with given token does not exists", 404);
    return next(error);
  }

  //  if the user changed password after token was issued
  if (user.isPasswordChanged(decodedToken.iat)) {
    const err = new customError(
      "Your password has been changed recently please login again.",
      400
    );
    return next(err);
  }
  // if flow of code reaches here means all are good lets assign user in request for further use in middlewares.
  req.user = user;
  next();
};

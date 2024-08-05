const express = require("express");
const router = express.Router();
const {
  createNewUser,
  findById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  updatePassword
} = require("../controllers/userController");
const authenticate = require('../utils/authentication');

router.post("/register", createNewUser);
router.post('/login',loginUser)
router.get("/",authenticate, getAllUsers);
router.patch('/password/update',authenticate,updatePassword);

router.route("/:id").get(findById).patch(updateUser).delete(deleteUser);
// router.get("/:id", findById);
// router.patch("/:id",updateUser);
// router.delete("/:id",deleteUser);
module.exports = router;

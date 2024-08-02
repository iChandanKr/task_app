const express = require("express");
const router = express.Router();
const {
  createNewUser,
  findById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", createNewUser);
router.get("/:id", findById);
router.get("/", getAllUsers);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);
module.exports = router;

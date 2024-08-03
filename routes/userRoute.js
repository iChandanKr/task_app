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
router.get("/", getAllUsers);

router.route("/:id").get(findById).patch(updateUser).delete(deleteUser);
// router.get("/:id", findById);
// router.patch("/:id",updateUser);
// router.delete("/:id",deleteUser);
module.exports = router;

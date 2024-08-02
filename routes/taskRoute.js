const express = require("express");
const router = express.Router();
const {
  addNewTask,
  fetchAllTasks,
  fetchById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/new", addNewTask);
router.get("/", fetchAllTasks);
router.get("/:id", fetchById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;

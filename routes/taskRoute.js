const express = require("express");
const authenticate = require('../utils/authentication');
const router = express.Router();
const {
  addNewTask,
  fetchAllTasks,
  fetchById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/new",authenticate, addNewTask);
router.get("/",authenticate, fetchAllTasks);
router.get("/:id",authenticate, fetchById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;

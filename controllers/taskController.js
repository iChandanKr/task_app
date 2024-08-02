const Task = require("../model/taskModel");

exports.addNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    if (task) {
      return res.status(201).json({
        status: "success",
        data: {
          task,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.fetchAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks) {
      return res.status(200).json({
        status: "success",
        data: {
          tasks,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (task) {
      return res.status(200).json({
        status: "success",
        data: {
          task,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "false",
      message: err,
    });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );
    console.log(task);
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTask = async (req,res)=>{
    const id = req.params.id;

    try {
         await Task.findByIdAndDelete(id);
        return res.status(200).json({
            status:"success",
            message:'Task deleted successfully!'
        })
    } catch (error) {
        res.status(404).json({
            status:"fail"
        })
    }
}
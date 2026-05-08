const Task = require("../models/Task");

exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user._id,
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createTask = async (req, res) => {

  try {

    const { title } = req.body;

    const task = await Task.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {

  try {

    const { title } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = title;

    await task.save();

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.completeTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await task.save();

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
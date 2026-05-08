const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
} = require("../controller/taskController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  getTasks
);

router.post(
  "/",
  protect,
  createTask
);

router.put(
  "/:id",
  protect,
  updateTask
);

router.put(
  "/complete/:id",
  protect,
  completeTask
);

router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;
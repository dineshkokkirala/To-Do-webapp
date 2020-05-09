const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Task = require("../../models/Task");
const { check, validationResult } = require("express-validator");

//router.get("/", (req, res) => res.json({ msg: "Tasks GET works" }));

//  GET    api/tasks
//  @private
//  to get user tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.send(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//router.post("/", (req, res) => res.json({ msg: "Tasks POST works" }));
//  POST    api/tasks
//  @private
//  to add tasks
router.post(
  "/",
  [auth, [check("task", "Task is Required").exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { task, type, date, expires } = req.body;

    try {
      const newTask = new Task({
        task,
        type,
        date,
        expires,
        user: req.user.id,
      });

      const tasks = await newTask.save();
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//router.put("/:id", (req, res) => res.json({ msg: "Tasks PUT works" }));

//  PUT   api/tasks
//  @private
//  Update task
router.put("/:id", auth, async (req, res) => {
  const { task, type, date, expires } = req.body;

  const taskFields = {};

  if (task) taskFields.task = task;
  if (type) taskFields.type = type;
  if (date) taskFields.type = date;
  if (expires) taskFields.expires = expires;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not Found" });
    }

    //make sure own task @own user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//router.delete("/:id", (req, res) => res.json({ msg: "Tasks DELETE works" }));

//  DELETE  api/tasks
//  @private
//  Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json("Task Not Found");
    }

    //make sure user own task

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: "Task Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

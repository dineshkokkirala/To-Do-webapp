const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  task: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  percentage: {
    type: String,
  },
  expires: {
    type: Date,
  },
});

module.exports = mongoose.model("task", TaskSchema);

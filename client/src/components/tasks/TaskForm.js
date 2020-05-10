import React, { useState, useContext, useEffect } from "react";
import TaskContext from "../../context/task/taskContext";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);

  useEffect(() => {
    if (taskContext.current !== null) {
      setTaskE(taskContext.current);
    } else {
      setTaskE({
        task: "",
        type: "personal",
        expires: "",
        percentage: "",
      });
    }
    //eslint-disable-next-line
  }, [taskContext, taskContext.current]);

  const [taskE, setTaskE] = useState({
    task: "",
    type: "personal",
    expires: "",
    percentage: "",
  });

  const clearAll = () => {
    taskContext.clearCurrent();
  };

  const { task, type, expires, percentage } = taskE;

  const onChange = (e) =>
    setTaskE({ ...taskE, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (taskContext.current === null) {
      taskContext.addTask(taskE);
    } else {
      taskContext.updateTask(taskE);
    }
    setTaskE({
      task: "",
      type: "personal",
      expires: "",
      percentage: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {taskContext.current !== null ? "Edit Task" : "Add Task"}
      </h2>
      <input
        type="text"
        name="task"
        value={task}
        placeholder="Task"
        onChange={onChange}
        required
      />
      <h4>Task Type:</h4>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <h4>Deadline Of Task:</h4>
      <input
        type="date"
        name="expires"
        onChange={onChange}
        value={expires}
        required
      />
      <h4>Progress:</h4>
      <input
        type="number"
        value={percentage}
        name="percentage"
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={taskContext.current !== null ? "Update Task" : "Add Task"}
          className="btn btn-primary btn-block"
        />
        {taskContext.current !== null && (
          <input
            type="submit"
            value="Clear"
            className="btn btn-light btn-block"
            onClick={clearAll}
          />
        )}
      </div>
    </form>
  );
};

export default TaskForm;

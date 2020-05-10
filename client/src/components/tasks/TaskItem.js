import React, { useContext } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";

const TaskItem = ({ eachtask }) => {
  const taskContext = useContext(TaskContext);

  const { id, task, type, expires, date, percentage } = eachtask;

  const onDelete = () => {
    taskContext.deleteTask(id);
    taskContext.clearCurrent();
  };

  return (
    <div className={"card bg-" + (percentage < 100 ? "light" : "success")}>
      <h3 className="text-primary text-left">
        {task}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-danger" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        <strong>Created Date: </strong>
        {date}
        <br />
        <strong>Due Date: </strong>
        {expires}
        <br />
        {percentage && (
          <li>
            <strong>Progress: </strong>
            {percentage}%
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => taskContext.setCurrent(eachtask)}
        >
          Update Task
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

TaskItem.propTypes = {
  eachtask: PropTypes.object.isRequired,
};

export default TaskItem;

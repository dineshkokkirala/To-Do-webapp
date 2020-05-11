import React, { useContext, Fragment, useEffect } from "react";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "./TaskItem";
import Spinner from "../layout/Spinner";

const Tasks = () => {
  const taskContext = useContext(TaskContext);

  const { tasks, filtered, getTasks, loading } = taskContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  if (tasks !== null && tasks.length === 0 && !loading) {
    return <h4>Please add a task</h4>;
  }

  return (
    <Fragment>
      {tasks !== null && !loading ? (
        <div>
          {filtered !== null
            ? filtered.map((task) => (
                <TaskItem key={task._id} eachtask={task} />
              ))
            : tasks.map((task) => <TaskItem key={task._id} eachtask={task} />)}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Tasks;

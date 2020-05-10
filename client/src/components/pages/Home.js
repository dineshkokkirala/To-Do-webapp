import React from "react";
import Tasks from "../tasks/Tasks";
import TaskForm from "../tasks/TaskForm";
import TaskFilter from "../tasks/TaskFilter";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <TaskForm />
      </div>
      <div>
        <TaskFilter />
        <Tasks />
      </div>
    </div>
  );
};

export default Home;

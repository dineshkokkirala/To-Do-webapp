import React, { useContext, useEffect } from "react";
import Tasks from "../tasks/Tasks";
import TaskForm from "../tasks/TaskForm";
import TaskFilter from "../tasks/TaskFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

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

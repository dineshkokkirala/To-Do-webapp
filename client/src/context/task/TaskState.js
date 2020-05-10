import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import uuid from "react-uuid";

import {
  ADD_TASK,
  GET_TASKS,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_TASK,
  UPDATE_TASK,
  FILTER_TASKS,
  CLEAR_FILTER,
  CLEAR_TASKS,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        task: "Front-end complete",
        type: "personal",
        expires: "02-11-2020",
        date: "30-10-2020",
        percentage: 45,
      },
      {
        id: 2,
        task: "Back-end complete",
        type: "professional",
        expires: "12-05-2020",
        date: "30-01-2020",
        percentage: 100,
      },
      {
        id: 3,
        task: "website complete",
        type: "personal",
        expires: "02-11-2020",
        date: "3-10-2020",
        percentage: 88,
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Add task
  const addTask = (work) => {
    work.id = uuid();
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    work.date = yyyy + "-" + mm + "-" + dd;
    dispatch({ type: ADD_TASK, payload: work });
  };

  //Delete task
  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  //set current task
  const setCurrent = (task) => {
    dispatch({ type: SET_CURRENT, payload: task });
  };

  //clear current task
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //update task
  const updateTask = (task) => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  //filter tasks
  const filterTasks = (text) => {
    dispatch({ type: FILTER_TASKS, payload: text });
  };

  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        filtered: state.filtered,
        addTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        updateTask,
        filterTasks,
        clearFilter,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;

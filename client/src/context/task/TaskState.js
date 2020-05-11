import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
//import uuid from "react-uuid";
import axios from "axios";

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
  TASK_ERROR,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //get tasks
  const getTasks = async (work) => {
    try {
      const res = await axios.get("/api/tasks");
      dispatch({ type: GET_TASKS, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //Add task
  const addTask = async (work) => {
    // work.id = uuid();
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
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/tasks", work, config);
      dispatch({ type: ADD_TASK, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //clear tasks
  const clearTasks = () => {
    dispatch({ type: CLEAR_TASKS });
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
  const updateTask = async (work) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/tasks/${work._id}`, work, config);
      dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
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
        error: state.error,
        addTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        updateTask,
        filterTasks,
        clearFilter,
        getTasks,
        clearTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;

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

export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload._id ? action.payload : task
        ),
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      };

    case CLEAR_TASKS:
      return {
        ...state,
        tasks: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_TASKS:
      return {
        ...state,
        filtered: state.tasks.filter((taskF) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            taskF.task.match(regex) ||
            taskF.expires.match(regex) ||
            taskF.date.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

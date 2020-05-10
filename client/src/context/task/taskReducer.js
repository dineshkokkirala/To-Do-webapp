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

export default (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
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
    default:
      return state;
  }
};

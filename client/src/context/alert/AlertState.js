import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import uuid from "react-uuid";
import { REMOVE_ALERT, SET_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set alert

  const setAlert = (msg, type, timeoout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeoout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.chidren}
    </AlertContext.Provider>
  );
};

export default AlertState;

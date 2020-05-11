import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types.js";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user

  //Register user

  //Login user

  //logout

  //clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        errors: state.errors,
        loading: state.loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

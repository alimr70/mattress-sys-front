import { createContext, useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import dbCore from "../dbCore.json";

const initialState = dbCore.auth;

const isDataSaved = localStorage.getItem("mattressSysAuth")
  ? JSON.parse(localStorage.getItem("mattressSysAuth"))
  : initialState;

export const AuthStore = createContext(isDataSaved);

export const AuthStoreProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, isDataSaved);

  useEffect(() => {
    localStorage.setItem("mattressSysAuth", JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthStore.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthStore.Provider>
  );
};

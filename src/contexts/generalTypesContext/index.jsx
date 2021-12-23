import { createContext, useReducer, useEffect } from "react";
import generalTypesReducer from "./generalTypesReducer";
import dbSample from "../dbSample.json";

const initialState = dbSample.generalTypes;

const isDataSaved = localStorage.getItem("mattressSysGeneralTypes")
  ? JSON.parse(localStorage.getItem("mattressSysGeneralTypes"))
  : initialState;

export const GeneralTypesStore = createContext(isDataSaved);

export const GeneralTypesStoreProvider = ({ children }) => {
  const [generalTypesState, generalTypesDispatch] = useReducer(
    generalTypesReducer,
    isDataSaved
  );

  useEffect(() => {
    localStorage.setItem(
      "mattressSysGeneralTypes",
      JSON.stringify(generalTypesState)
    );
  }, [generalTypesState]);

  return (
    <GeneralTypesStore.Provider
      value={{ generalTypesState, generalTypesDispatch }}>
      {children}
    </GeneralTypesStore.Provider>
  );
};

import { createContext, useReducer, useEffect } from "react";
import customDimensionReducer from "./customDimensionReducer";
import dbCore from "../dbCore.json";

const initialState = dbCore.customDimension;

const isDataSaved = localStorage.getItem("mattressSysCustomDimension")
  ? JSON.parse(localStorage.getItem("mattressSysCustomDimension"))
  : initialState;

export const CustomDimensionStore = createContext(isDataSaved);

export const CustomDimensionStoreProvider = ({ children }) => {
  const [customDimensionState, customDimensionDispatch] = useReducer(
    customDimensionReducer,
    isDataSaved
  );

  useEffect(() => {
    localStorage.setItem(
      "mattressSysCustomDimension",
      JSON.stringify(customDimensionState)
    );
  }, [customDimensionState]);

  return (
    <CustomDimensionStore.Provider
      value={{ customDimensionState, customDimensionDispatch }}>
      {children}
    </CustomDimensionStore.Provider>
  );
};

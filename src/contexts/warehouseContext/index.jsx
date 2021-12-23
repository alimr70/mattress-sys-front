import { createContext, useReducer, useEffect } from "react";
import warehouseReducer from "./warehouseReducer";
import dbSample from "../dbSample.json";

const initialState = dbSample.warehouse;

const isDataSaved = localStorage.getItem("mattressSysWarehouse")
  ? JSON.parse(localStorage.getItem("mattressSysWarehouse"))
  : initialState;

export const WarehouseStore = createContext(isDataSaved);

export const WarehouseStoreProvider = ({ children }) => {
  const [warehouseState, warehouseDispatch] = useReducer(
    warehouseReducer,
    isDataSaved
  );

  useEffect(() => {
    localStorage.setItem(
      "mattressSysWarehouse",
      JSON.stringify(warehouseState)
    );
  }, [warehouseState]);

  return (
    <WarehouseStore.Provider value={{ warehouseState, warehouseDispatch }}>
      {children}
    </WarehouseStore.Provider>
  );
};

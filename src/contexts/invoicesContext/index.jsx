import { createContext, useReducer, useEffect } from "react";
import invoicesReducer from "./invoicesReducer";
import dbSample from "../dbSample.json";

const initialState = dbSample.invoices;

const isDataSaved = localStorage.getItem("mattressSysInvoices")
  ? JSON.parse(localStorage.getItem("mattressSysInvoices"))
  : initialState;

export const InvoicesStore = createContext(isDataSaved);

export const InvoicesStoreProvider = ({ children }) => {
  const [invoicesState, dispatch] = useReducer(invoicesReducer, isDataSaved);

  useEffect(() => {
    localStorage.setItem("mattressSysInvoices", JSON.stringify(invoicesState));
  }, [invoicesState]);

  return (
    <InvoicesStore.Provider value={{ invoicesState, dispatch }}>
      {children}
    </InvoicesStore.Provider>
  );
};

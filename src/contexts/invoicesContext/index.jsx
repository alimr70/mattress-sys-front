import { createContext, useReducer, useEffect } from "react";
import invoicesReducer from "./invoicesReducer";
import dbCore from "../dbCore.json";

const initialState = dbCore.invoices;

const isDataSaved = localStorage.getItem("mattressSysInvoices")
  ? JSON.parse(localStorage.getItem("mattressSysInvoices"))
  : initialState;

export const InvoicesStore = createContext(isDataSaved);

export const InvoicesStoreProvider = ({ children }) => {
  const [invoicesState, invoicesDispatch] = useReducer(
    invoicesReducer,
    isDataSaved
  );

  useEffect(() => {
    localStorage.setItem("mattressSysInvoices", JSON.stringify(invoicesState));
  }, [invoicesState]);

  return (
    <InvoicesStore.Provider value={{ invoicesState, invoicesDispatch }}>
      {children}
    </InvoicesStore.Provider>
  );
};

import { createContext, useReducer, useEffect } from "react";
import productsReducer from "./productsReducer";
import dbSample from "../dbSample.json";

const initialState = dbSample.products;

const isDataSaved = localStorage.getItem("mattressSysProducts")
  ? JSON.parse(localStorage.getItem("mattressSysProducts"))
  : initialState;

export const ProductsStore = createContext(isDataSaved);

export const ProductsStoreProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(productsReducer, isDataSaved);

  useEffect(() => {
    localStorage.setItem("mattressSysProducts", JSON.stringify(productsState));
  }, [productsState]);

  return (
    <ProductsStore.Provider value={{ productsState, dispatch }}>
      {children}
    </ProductsStore.Provider>
  );
};

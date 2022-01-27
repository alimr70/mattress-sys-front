import { createContext, useReducer, useEffect } from "react";
import productsReducer from "./productsReducer";
import dbCore from "../dbCore.json";

const initialState = dbCore.products;

const isDataSaved = localStorage.getItem("mattressSysProducts")
  ? JSON.parse(localStorage.getItem("mattressSysProducts"))
  : initialState;

export const ProductsStore = createContext(isDataSaved);

export const ProductsStoreProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    isDataSaved
  );

  useEffect(() => {
    localStorage.setItem("mattressSysProducts", JSON.stringify(productsState));
  }, [productsState]);

  return (
    <ProductsStore.Provider value={{ productsState, productsDispatch }}>
      {children}
    </ProductsStore.Provider>
  );
};

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GeneralTypesStoreProvider } from "./contexts/generalTypesContext";
import { ProductsStoreProvider } from "./contexts/productsContext";
import { WarehouseStoreProvider } from "./contexts/warehouseContext";
import { InvoicesStoreProvider } from "./contexts/invoicesContext";
import { AuthStoreProvider } from "./contexts/authContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthStoreProvider>
        <GeneralTypesStoreProvider>
          <ProductsStoreProvider>
            <WarehouseStoreProvider>
              <InvoicesStoreProvider>
                <App />
              </InvoicesStoreProvider>
            </WarehouseStoreProvider>
          </ProductsStoreProvider>
        </GeneralTypesStoreProvider>
      </AuthStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

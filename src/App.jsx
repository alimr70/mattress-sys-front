import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Invoices from "./pages/Invoices";
import AddProduct from "./pages/AddProduct";
import AddToWarehouse from "./pages/AddToWarehouse";
import AddInvoice from "./pages/AddInvoice";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <div className="App h-screen overflow-auto bg-gray-900 text-gray-300 print:contents">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="products"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route
          path="addproduct"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route
          path="warehouse"
          element={
            <RequireAuth>
              <Warehouse />
            </RequireAuth>
          }
        />
        <Route
          path="invoices"
          element={
            <RequireAuth>
              <Invoices />
            </RequireAuth>
          }
        />
        <Route
          path="addtowarehouse"
          element={
            <RequireAuth>
              <AddToWarehouse />
            </RequireAuth>
          }
        />
        <Route
          path="addinvoice"
          element={
            <RequireAuth>
              <AddInvoice />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

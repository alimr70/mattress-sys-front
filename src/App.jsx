import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Invoices from "./pages/Invoices";
import AddProduct from "./pages/AddProduct";
import AddToWarehouse from "./pages/AddToWarehouse";
import AddInvoice from "./pages/AddInvoice";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";
import NotAuth from "./pages/NotAuth";
import RequireRole from "./components/RequireRole";
import Logout from "./pages/Logout";
import DetailsAndEdit from "./pages/DetailsAndEdit";
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
        <Route path="products">
          <Route
            index
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <RequireAuth>
                <RequireRole roles={["programmer", "manager"]}>
                  <DetailsAndEdit />
                </RequireRole>
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="addproduct"
          element={
            <RequireAuth>
              <RequireRole roles={["programmer"]}>
                <AddProduct />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route path="warehouse">
          <Route
            index
            element={
              <RequireAuth>
                <Warehouse />
              </RequireAuth>
            }
          />
          <Route
            path="/warehouse/:warehouseItemId"
            element={
              <RequireAuth>
                <RequireRole roles={["programmer", "manager"]}>
                  <DetailsAndEdit />
                </RequireRole>
              </RequireAuth>
            }
          />
        </Route>
        <Route path="invoices">
          <Route
            index
            element={
              <RequireAuth>
                <Invoices />
              </RequireAuth>
            }
          />
          <Route
            path="/invoices/:invoiceId"
            element={
              <RequireAuth>
                <RequireRole roles={["programmer", "manager"]}>
                  <DetailsAndEdit />
                </RequireRole>
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="addtowarehouse"
          element={
            <RequireAuth>
              <RequireRole roles={["programmer", "manager"]}>
                <AddToWarehouse />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="addinvoice"
          element={
            <RequireAuth>
              <RequireRole roles={["programmer", "manager"]}>
                <AddInvoice />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="notauth" element={<NotAuth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Invoices from "./pages/Invoices";
import AddProduct from "./pages/AddProduct";
function App() {
  return (
    <div className="App h-screen overflow-auto bg-gray-900 text-gray-300">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;

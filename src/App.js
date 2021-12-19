import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Invoices from "./pages/Invoices";
function App() {
  return (
    <div className="App h-screen overflow-auto bg-gray-900 text-gray-300">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;

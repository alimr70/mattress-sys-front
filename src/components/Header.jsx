import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isMenuOpen = openMenu ? "" : "hidden";
  return (
    <header className="bg-blue-500 p-4 grid grid-cols-4 print:hidden">
      <nav className="col-span-2 xs:col-span-3">
        <MenuIcon
          className="sm:hidden h-5 w-5 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        />

        <ul className={`${isMenuOpen} flex flex-col xs:flex-row sm:flex"`}>
          <Link to="/invoices" className={`${openMenu ? "my-2" : ""}`}>
            <li className="px-5">الفواتير</li>
          </Link>
          <Link to="/warehouse" className={`${openMenu ? "my-2" : ""}`}>
            <li className="px-5">المخزن</li>
          </Link>
          <Link to="/products" className={`${openMenu ? "my-2" : ""}`}>
            <li className="px-5">المنتجات</li>
          </Link>
        </ul>
      </nav>

      <div className="col-span-2 xs:col-span-1 justify-self-end text-left">
        <h1>Taki System</h1>
      </div>
    </header>
  );
};

export default Header;

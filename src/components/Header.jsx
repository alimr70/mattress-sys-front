import { MenuIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";
import { logout } from "../contexts/authContext/authActions";
const Header = () => {
  const { authState, authDispatch } = useContext(AuthStore);
  const [openMenu, setOpenMenu] = useState(false);
  const isMenuOpen = openMenu ? "" : "hidden";
  return (
    <header className="bg-blue-500 p-4 grid grid-cols-4 print:hidden">
      <nav className="col-span-2 xs:col-span-3">
        <MenuIcon
          className="sm:hidden h-5 w-5 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        />

        <ul className={`${isMenuOpen} sm:hidden flex flex-col xs:flex-row"`}>
          <Link to="/invoices" className="my-2">
            <li className="px-5">الفواتير</li>
          </Link>
          <Link to="/warehouse" className="my-2">
            <li className="px-5">المخزن</li>
          </Link>
          <Link to="/products" className="my-2">
            <li className="px-5 pl-2">المنتجات</li>
          </Link>
          <Link to="/calculations" className="my-2">
            <li className="px-5 pl-2">الحسابات</li>
          </Link>
          <span className="hidden sm:block">|</span>
          <li className="px-2">
            مرحبا {authState.username}{" "}
            <button
              className="p-1 bg-red-500 rounded-md"
              onClick={() => authDispatch(logout())}>
              تسجيل الخروج
            </button>
          </li>
        </ul>

        <ul className="hidden sm:flex flex-col xs:flex-row">
          <Link to="/invoices">
            <li className="px-3">الفواتير</li>
          </Link>
          <Link to="/warehouse">
            <li className="px-3">المخزن</li>
          </Link>
          <Link to="/products">
            <li className="px-3">المنتجات</li>
          </Link>
          <Link to="/calculations">
            <li className="px-3">الحسابات</li>
          </Link>
          <span>|</span>
          <li className="px-5">
            مرحبا {authState.username}{" "}
            <button
              className="px-1 bg-red-500 rounded-md"
              onClick={() => authDispatch(logout())}>
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </nav>

      <div className="col-span-2 xs:col-span-1 justify-self-end text-left">
        <h1>Taki System</h1>
      </div>
    </header>
  );
};

export default Header;

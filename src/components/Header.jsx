import { MenuIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="flex flex-row justify-between">
        <MenuIcon className="sm:hidden h-5 w-5" />
        <nav className="hidden sm:block">
          <ul className="flex flex-row">
            <Link to="/invoices">
              <li className="px-5">الفواتير</li>
            </Link>
            <Link to="/warehouse">
              <li className="px-5">المخزن</li>
            </Link>
            <Link to="/products">
              <li className="px-5">المنتجات</li>
            </Link>
          </ul>
        </nav>
        <div>
          <h1>Taki System</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

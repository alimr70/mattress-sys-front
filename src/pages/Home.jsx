import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { AuthStore } from "../contexts/authContext";
import { logout } from "../contexts/authContext/authActions";

const Home = () => {
  const { authState, authDispatch } = useContext(AuthStore);

  return (
    <>
      <button
        className="px-1 bg-red-500 rounded-md"
        onClick={() => authDispatch(logout())}>
        تسجيل الخروج
      </button>
      <Container title={`مرحبا ${authState.username}`}>
        <div className="my-2 w-full max-w-lg mx-auto grid gap-4 grid-cols-1 xs:grid-cols-3 sm:grid-cols-3">
          <HomePageLink title="الحسابات" linkPath="/calculations" />
          <HomePageLink title="إنشاء فاتورة" linkPath="/addinvoice" />
          <HomePageLink title="الفواتير" linkPath="/invoices" />
          <HomePageLink title="المخزن" linkPath="/warehouse" />
          <HomePageLink title="إضافة مخزون" linkPath="/addtowarehouse" />
          <HomePageLink title="المنتجات" linkPath="/products" />
          <HomePageLink title="إضافة منتج" linkPath="/addproduct" />
        </div>
      </Container>
    </>
  );
};

const HomePageLink = ({ title, linkPath }) => {
  return (
    <div className="col-span-1 h-28 grid bg-gray-700 rounded-md">
      <Link
        to={linkPath}
        className="w-full h-full grid items-center justify-center">
        <h1 className="text-3lg font-bold text-gray-300">{title}</h1>
      </Link>
    </div>
  );
};

export default Home;

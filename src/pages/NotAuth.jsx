import { Link } from "react-router-dom";

const NotAuth = () => {
  return (
    <>
      <div className="w-full h-full grid">
        <div className="justify-self-center self-center grid grid-cols-1 gap-3">
          <h1>عذرا، ليس لديك الصلاحيات</h1>
          <Link to="/" className="p-2 bg-blue-500 rounded-md">
            عودة للصفحة الرئيسة
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotAuth;

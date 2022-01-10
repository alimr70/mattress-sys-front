import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="w-full h-full grid">
        <div className="justify-self-center self-center grid grid-cols-1 gap-3">
          <h1>عذرا، لا يمكن العثور علي الصفحة المطلوبة</h1>
          <Link to="/" className="p-2 bg-blue-500 rounded-md">
            عودة للصفحة الرئيسة
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;

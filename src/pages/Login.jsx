import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";
import { login } from "../contexts/authContext/authActions";

const Login = () => {
  let { authDispatch } = useContext(AuthStore);
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password === process.env.REACT_APP_PROGRAMMER_PS) {
      setRole("programmer");
    }
    if (password === process.env.REACT_APP_MANAGER_PS) {
      setRole("manager");
    }
    if (password === process.env.REACT_APP_ACCOUNTANT_PS) {
      setRole("accountant");
    }

    if (username !== "" && role !== "") {
      authDispatch(login({ username, role }));
      navigate(from, { replace: true });
    }

    return setPassWord("") + setUserName("");
  }

  useEffect(() => {
    if (password === process.env.REACT_APP_PROGRAMMER_PS) {
      return setRole("programmer");
    }
    if (password === process.env.REACT_APP_MANAGER_PS) {
      return setRole("manager");
    }
    if (password === process.env.REACT_APP_ACCOUNTANT_PS) {
      return setRole("accountant");
    }
    return;
  }, [password]);

  return (
    <div className="w-full h-full grid">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="justify-self-center self-center grid grid-cols-3 gap-3">
        <label className="col-span-1">اسم المستخدم: </label>
        <input
          className="px-2 col-span-2 text-gray-900"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="col-span-1">كلمة المرور: </label>
        <input
          className="px-2 col-span-2 text-gray-900"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1 justify-self-center bg-blue-600 rounded-md col-span-3">
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default Login;

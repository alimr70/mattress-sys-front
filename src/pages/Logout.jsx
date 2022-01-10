import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";
import { logout } from "../contexts/authContext/authActions";

const Logout = () => {
  let { authDispatch } = useContext(AuthStore);

  useEffect(() => {
    authDispatch(logout());
  });

  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Logout;

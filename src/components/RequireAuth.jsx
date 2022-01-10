import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";

const RequireAuth = ({ children }) => {
  let { authState } = useContext(AuthStore);
  let location = useLocation();

  if (authState.username === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;

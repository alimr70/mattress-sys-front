import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";

const RequireRole = ({ children, roles }) => {
  let { authState } = useContext(AuthStore);

  if (!roles.includes(authState.role)) {
    return <Navigate to="/notauth" replace />;
  }

  return children;
};

export default RequireRole;

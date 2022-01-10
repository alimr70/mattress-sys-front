import { LOGIN, LOGOUT } from "./authActions";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.user.username, role: action.user.role };

    case LOGOUT:
      return { username: "", role: "" };

    default:
      return state;
  }
};

export default authReducer;

import { INIT_GENERALTYPES_DATA } from "./generalTypesActions";

const generalTypesReducer = (state, action) => {
  switch (action.type) {
    case INIT_GENERALTYPES_DATA:
      return { ...action.generalTypes };

    default:
      return state;
  }
};

export default generalTypesReducer;

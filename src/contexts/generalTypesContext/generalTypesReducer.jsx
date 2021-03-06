import {
  ADD_SERIAL_NUMBER,
  INIT_GENERALTYPES_DATA,
} from "./generalTypesActions";

const generalTypesReducer = (state, action) => {
  switch (action.type) {
    case INIT_GENERALTYPES_DATA:
      return { ...action.generalTypes };

    case ADD_SERIAL_NUMBER:
      return {
        ...state,
        serialNumbers: {
          ...state.serialNumbers,
          [action.field]: [...state.serialNumbers[action.field], action.number],
        },
      };

    default:
      return state;
  }
};

export default generalTypesReducer;

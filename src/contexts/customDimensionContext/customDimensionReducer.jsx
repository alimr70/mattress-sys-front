import {
  INIT_CUSTOM_DIMENSION_DATA,
  ADD_CUSTOM_DIMENSION,
} from "./customDimensionActions";

const customDimensionReducer = (state, action) => {
  switch (action.type) {
    case INIT_CUSTOM_DIMENSION_DATA:
      return { ...action.customDimension };

    case ADD_CUSTOM_DIMENSION:
      return {
        ...state,
        [action.customDimension.id]: { ...action.customDimension },
      };

    default:
      return state;
  }
};

export default customDimensionReducer;

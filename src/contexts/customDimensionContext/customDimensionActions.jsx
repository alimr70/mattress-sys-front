export const INIT_CUSTOM_DIMENSION_DATA = "INIT_CUSTOM_DIMENSION_DATA";
export const ADD_CUSTOM_DIMENSION = "ADD_CUSTOM_DIMENSION";

export const addCustomDimension = (customDimension) => {
  return {
    type: ADD_CUSTOM_DIMENSION,
    customDimension,
  };
};

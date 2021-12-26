export const INIT_PRODUCTS_DATA = "INIT_PRODUCTS_DATA";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

import { INIT_PRODUCTS_DATA, ADD_PRODUCT } from "./productsActions";

const productsReducer = (state, action) => {
  switch (action.type) {
    case INIT_PRODUCTS_DATA:
      return { ...action.products };

    case ADD_PRODUCT:
      return { ...state, [action.product.id]: { ...action.product } };

    default:
      return state;
  }
};

export default productsReducer;

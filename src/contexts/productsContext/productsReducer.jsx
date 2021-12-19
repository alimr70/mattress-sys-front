import { INIT_PRODUCTS_DATA } from "./productsActions";

const proudctsReducer = (state, action) => {
  switch (action.type) {
    case INIT_PRODUCTS_DATA:
      return { ...action.products };

    default:
      return state;
  }
};

export default proudctsReducer;

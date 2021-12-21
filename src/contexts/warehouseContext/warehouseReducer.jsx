import { INIT_WAREHOUSE_DATA } from "./warehouseActions";

const warehouseReducer = (state, action) => {
  switch (action.type) {
    case INIT_WAREHOUSE_DATA:
      return { ...action.warehouse };

    default:
      return state;
  }
};

export default warehouseReducer;

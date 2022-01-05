import {
  INIT_WAREHOUSE_DATA,
  ADD_NEW_WAREHOUSE_ITEM,
  ADD_EXISTING_WAREHOUSE_ITEM,
} from "./warehouseActions";

const warehouseReducer = (state, action) => {
  switch (action.type) {
    case INIT_WAREHOUSE_DATA:
      return { ...action.warehouse };

    case ADD_NEW_WAREHOUSE_ITEM:
      return { ...state, [action.item.id]: { ...action.item } };

    case ADD_EXISTING_WAREHOUSE_ITEM:
      return { ...state, [action.item.id]: { ...action.item } };

    default:
      return state;
  }
};

export default warehouseReducer;

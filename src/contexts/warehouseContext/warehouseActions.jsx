export const INIT_WAREHOUSE_DATA = "INIT_WAREHOUSE_DATA";
export const ADD_WAREHOUSE_ITEM = "ADD_WAREHOUSE_ITEM";

export const addWarehouseItem = (item) => {
  return {
    type: ADD_WAREHOUSE_ITEM,
    item,
  };
};

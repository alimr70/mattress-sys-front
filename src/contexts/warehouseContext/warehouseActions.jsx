export const INIT_WAREHOUSE_DATA = "INIT_WAREHOUSE_DATA";
export const ADD_NEW_WAREHOUSE_ITEM = "ADD_NEW_WAREHOUSE_ITEM";
export const ADD_EXISTING_WAREHOUSE_ITEM = "ADD_EXISTING_WAREHOUSE_ITEM";
export const REMOVE_SOLD_WAREHOUSE_ITEM = "REMOVE_SOLD_WAREHOUSE_ITEM";

export const addNewWarehouseItem = (item) => {
  return {
    type: ADD_NEW_WAREHOUSE_ITEM,
    item,
  };
};

export const addExistingWarehouseItem = (item) => {
  return {
    type: ADD_EXISTING_WAREHOUSE_ITEM,
    item,
  };
};

export const removeSoldWarehouseItem = (item) => {
  return {
    type: REMOVE_SOLD_WAREHOUSE_ITEM,
    item,
  };
};

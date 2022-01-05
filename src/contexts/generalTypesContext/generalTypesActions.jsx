export const INIT_GENERALTYPES_DATA = "INIT_GENERALTYPES_DATA";
export const ADD_SERIAL_NUMBER = "ADD_SERIAL_NUMBER";
export const productsSerials = "productsSerials";
export const warehouseSerials = "warehouseSerials";
export const invoicesSerials = "invoicesSerials";

export const addSerialNumber = (number, field) => {
  return {
    type: ADD_SERIAL_NUMBER,
    number,
    field,
  };
};

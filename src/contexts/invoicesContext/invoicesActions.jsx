export const INIT_INVOICES_DATA = "INIT_INVOICES_DATA";
export const ADD_INVOICE_ITEM = "ADD_INVOICE_ITEM";

export const addInvoiceItem = (invoice) => {
  return {
    type: ADD_INVOICE_ITEM,
    invoice,
  };
};

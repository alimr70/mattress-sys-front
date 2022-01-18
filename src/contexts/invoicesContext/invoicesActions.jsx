export const INIT_INVOICES_DATA = "INIT_INVOICES_DATA";
export const ADD_INVOICE_ITEM = "ADD_INVOICE_ITEM";
export const EDIT_INVOICE_SECTION = "EDIT_INVOICE_SECTION";

export const addInvoiceItem = (invoice) => {
  return {
    type: ADD_INVOICE_ITEM,
    invoice,
  };
};

export const editInvoiceSection = (invoiceItem, section) => {
  return {
    type: EDIT_INVOICE_SECTION,
    invoiceItem,
    section,
  };
};

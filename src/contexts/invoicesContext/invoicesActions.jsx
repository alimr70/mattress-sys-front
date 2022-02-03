export const INIT_INVOICES_DATA = "INIT_INVOICES_DATA";
export const ADD_INVOICE_ITEM = "ADD_INVOICE_ITEM";
export const EDIT_INVOICE_SECTIONS = "EDIT_INVOICE_SECTIONS";
export const DELETE_INVOICE = "DELETE_INVOICE";

export const addInvoiceItem = (invoice) => {
  return {
    type: ADD_INVOICE_ITEM,
    invoice,
  };
};

export const editInvoiceSections = (invoiceItem, sections) => {
  return {
    type: EDIT_INVOICE_SECTIONS,
    invoiceItem,
    sections,
  };
};

export const deleteInvoice = (invoiceId) => {
  return {
    type: DELETE_INVOICE,
    invoiceId,
  };
};

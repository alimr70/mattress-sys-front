import {
  ADD_INVOICE_ITEM,
  INIT_INVOICES_DATA,
  EDIT_INVOICE_SECTION,
} from "./invoicesActions";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case INIT_INVOICES_DATA:
      return { ...action.invoices };

    case ADD_INVOICE_ITEM:
      return { ...state, [action.invoice.id]: { ...action.invoice } };

    case EDIT_INVOICE_SECTION:
      return {
        ...state,
        [action.invoiceItem.id]: {
          ...action.invoiceItem,
          [action.section.key]: action.section.value,
        },
      };

    default:
      return state;
  }
};

export default invoicesReducer;

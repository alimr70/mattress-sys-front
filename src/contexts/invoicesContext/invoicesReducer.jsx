import {
  ADD_INVOICE_ITEM,
  INIT_INVOICES_DATA,
  EDIT_INVOICE_SECTIONS,
  DELETE_INVOICE,
} from "./invoicesActions";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case INIT_INVOICES_DATA:
      return { ...action.invoices };

    case ADD_INVOICE_ITEM:
      return { ...state, [action.invoice.id]: { ...action.invoice } };

    case EDIT_INVOICE_SECTIONS:
      const editedSections = action.sections.reduce(
        (prev, current) => ({ ...prev, [current.key]: current.value }),
        {}
      );
      return {
        ...state,
        [action.invoiceItem.id]: {
          ...action.invoiceItem,
          ...editedSections,
        },
      };

    case DELETE_INVOICE:
      return {
        ...state,
        [action.invoiceId]: {
          ...state[action.invoiceId],
          status: "deleted",
        },
      };

    default:
      return state;
  }
};

export default invoicesReducer;

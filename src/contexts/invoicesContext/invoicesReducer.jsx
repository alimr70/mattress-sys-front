import { ADD_INVOICE_ITEM, INIT_INVOICES_DATA } from "./invoicesActions";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case INIT_INVOICES_DATA:
      return { ...action.invoices };

    case ADD_INVOICE_ITEM:
      return { ...state, [action.invoice.id]: { ...action.invoice } };

    default:
      return state;
  }
};

export default invoicesReducer;

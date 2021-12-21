import { INIT_INVOICES_DATA } from "./invoicesActions";

const invoicesReducer = (state, action) => {
  switch (action.type) {
    case INIT_INVOICES_DATA:
      return { ...action.invoices };

    default:
      return state;
  }
};

export default invoicesReducer;

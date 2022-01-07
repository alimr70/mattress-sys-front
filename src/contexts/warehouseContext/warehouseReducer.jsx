import {
  INIT_WAREHOUSE_DATA,
  ADD_NEW_WAREHOUSE_ITEM,
  ADD_EXISTING_WAREHOUSE_ITEM,
  REMOVE_SOLD_WAREHOUSE_ITEM,
} from "./warehouseActions";

const warehouseReducer = (state, action) => {
  switch (action.type) {
    case INIT_WAREHOUSE_DATA:
      return { ...action.warehouse };

    case ADD_NEW_WAREHOUSE_ITEM:
      return { ...state, [action.item.id]: { ...action.item } };

    case ADD_EXISTING_WAREHOUSE_ITEM:
      return { ...state, [action.item.id]: { ...action.item } };

    case REMOVE_SOLD_WAREHOUSE_ITEM:
      const foundItem = state[action.id];
      const modifiedItem = removeSoldItemAcending(foundItem, action.quantity);
      return { ...state, [modifiedItem.id]: { ...modifiedItem } };

    default:
      return state;
  }
};

const removeSoldItemAcending = (warehouseItem, soldQuantity) => {
  const removeFromFoundAvalability = (availabilitySection, soldQuantity) => {
    return availabilitySection.quantity < soldQuantity
      ? {
          remaining: soldQuantity - availabilitySection.quantity,
          modifiedSection: { ...availabilitySection, quantity: 0 },
        }
      : {
          modifiedSection: {
            ...availabilitySection,
            quantity: availabilitySection.quantity - soldQuantity,
          },
        };
  };

  const cycleThroughAvailability = (availability, sectionNum, soldQuantity) => {
    if (soldQuantity === 0 || isNaN(soldQuantity)) return availability;

    if (availability[sectionNum] !== undefined) {
      const removeOperation = removeFromFoundAvalability(
        availability[sectionNum],
        soldQuantity
      );
      if (
        removeOperation.remaining !== undefined &&
        removeOperation.remaining > 0
      ) {
        availability = {
          ...availability,
          [removeOperation.modifiedSection.companyDiscount]: {
            ...removeOperation.modifiedSection,
          },
        };
        return cycleThroughAvailability(
          availability,
          sectionNum + 5,
          removeOperation.remaining
        );
      } else {
        availability = {
          ...availability,
          [removeOperation.modifiedSection.companyDiscount]: {
            ...removeOperation.modifiedSection,
          },
        };
        return availability;
      }
    } else {
      return cycleThroughAvailability(
        availability,
        sectionNum + 5,
        soldQuantity
      );
    }
  };

  const { availability } = warehouseItem;

  const newAvailability = cycleThroughAvailability(
    availability,
    5,
    soldQuantity
  );

  warehouseItem = {
    ...warehouseItem,
    availability: { ...newAvailability },
  };

  return warehouseItem;
};

export default warehouseReducer;

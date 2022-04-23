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
      const foundItem = state[action.item.warehouseId];
      const priceOnRetailOrOldArr = Object.values(
        action.item.priceOnRetailOrOld
      );

      let newAvailability = foundItem?.availability;

      if (newAvailability === undefined) return state;

      priceOnRetailOrOldArr.forEach((el) => {
        el.priceHistoryAndQuantity.forEach((recordItem) => {
          let record = JSON.parse(recordItem);

          newAvailability[el.companyDiscount].quantities[record.date] =
            newAvailability[el.companyDiscount].quantities[record.date] -
              record.quantity <
            0
              ? 0
              : newAvailability[el.companyDiscount].quantities[record.date] -
                record.quantity;
        });
      });

      return { ...state, [foundItem.id]: { ...foundItem } };

    // const modifiedItem = removeSoldItemAcending(foundItem, action.quantity);
    // return modifiedItem !== undefined
    //   ? { ...state, [modifiedItem.id]: { ...modifiedItem } }
    //   : state;

    default:
      return state;
  }
};

// const removeSoldItemAcending = (warehouseItem, soldQuantity) => {
//   if (warehouseItem === undefined) return;

//   const removeFromFoundAvalability = (availabilitySection, soldQuantity) => {
//     return availabilitySection.quantity < soldQuantity
//       ? {
//           remaining: soldQuantity - availabilitySection.quantity,
//           modifiedSection: { ...availabilitySection, quantity: 0 },
//         }
//       : {
//           modifiedSection: {
//             ...availabilitySection,
//             quantity: availabilitySection.quantity - soldQuantity,
//           },
//         };
//   };

//   const cycleThroughAvailability = (availability, sectionNum, soldQuantity) => {
//     if (sectionNum === 100 || soldQuantity === 0 || isNaN(soldQuantity))
//       return availability;

//     if (availability[sectionNum] !== undefined) {
//       const removeOperation = removeFromFoundAvalability(
//         availability[sectionNum],
//         soldQuantity
//       );
//       if (
//         removeOperation.remaining !== undefined &&
//         removeOperation.remaining > 0
//       ) {
//         availability = {
//           ...availability,
//           [removeOperation.modifiedSection.companyDiscount]: {
//             ...removeOperation.modifiedSection,
//           },
//         };
//         return cycleThroughAvailability(
//           availability,
//           sectionNum + 5,
//           removeOperation.remaining
//         );
//       } else {
//         availability = {
//           ...availability,
//           [removeOperation.modifiedSection.companyDiscount]: {
//             ...removeOperation.modifiedSection,
//           },
//         };
//         return availability;
//       }
//     } else {
//       return cycleThroughAvailability(
//         availability,
//         sectionNum + 5,
//         soldQuantity
//       );
//     }
//   };

//   const { availability } = warehouseItem;

//   const newAvailability = cycleThroughAvailability(
//     availability,
//     5,
//     soldQuantity
//   );

//   warehouseItem = {
//     ...warehouseItem,
//     availability: { ...newAvailability },
//   };

//   return warehouseItem;
// };

export default warehouseReducer;

export const getOrderDetailsFromWarehouse = (warehouseItem, soldQuantity, productPrice) => {
    // WarehouseItem data sample
    // OLd: {"price": 4250, "quantity": 3, "companyDiscount": 25},{"price": 4250, "quantity": 1, "companyDiscount": 30}
    // NEW: {
    //   "id": "18949841648",
    //   "productId": "Tadzn6pils",
    //   "availability": {
    //     "25": {
    //       "quantities": [
    //         { "priceHistoryDate": "2022-01-01", "quantity": 3 },
    //         { "priceHistoryDate": "2022-02-01", "quantity": 4 }
    //       ],
    //       "companyDiscount": 25
    //     },
    //     "30": {
    //       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
    //       "companyDiscount": 30
    //     },
    //     "35": {
    //       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
    //       "companyDiscount": 35
    //     },
    //     "40": {
    //       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
    //       "companyDiscount": 40
    //     }
    //   }
    // }
    if (warehouseItem === undefined) {
        // alert(`غير متوفر في المخزن عدد ${soldQuantity} من هذا المنتج وسيتم إضافته لقسم الطلبيات`);
        return [{ price: productPrice, quantity: soldQuantity, companyDiscount: 25, finalPriceBeforeDiscount: 0, finalPriceAfterDiscount: 0 }]
    }

    const priceOnRetailOrOld = [];

    const countFromFoundAvalability = (availabilitySection, soldQuantity) => {
        return availabilitySection.quantity < soldQuantity ?
            availabilitySection.quantity === 0 ? { remaining: soldQuantity - availabilitySection.quantity } :
            priceOnRetailOrOld.push({
                price: productPrice,
                quantity: availabilitySection.quantity,
                companyDiscount: availabilitySection.companyDiscount,
                finalPriceBeforeDiscount: 0,
                finalPriceAfterDiscount: 0
            }) && { remaining: soldQuantity - availabilitySection.quantity } :
            priceOnRetailOrOld.push({
                price: productPrice,
                quantity: soldQuantity,
                companyDiscount: availabilitySection.companyDiscount,
                finalPriceBeforeDiscount: 0,
                finalPriceAfterDiscount: 0
            });
    };

    const cycleThroughAvailability = (availability, sectionNum, soldQuantity) => {
        if (sectionNum === 100 || soldQuantity === 0 || isNaN(soldQuantity)) return;

        if (availability[sectionNum] !== undefined) {
            const countOperation = countFromFoundAvalability(
                availability[sectionNum],
                soldQuantity
            );
            if (
                countOperation.remaining !== undefined &&
                countOperation.remaining > 0
            ) {
                return cycleThroughAvailability(
                    availability,
                    sectionNum + 5,
                    countOperation.remaining
                );
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

    cycleThroughAvailability(
        availability,
        5,
        soldQuantity
    );

    let totalAvailable = 0;
    priceOnRetailOrOld.forEach((el) => totalAvailable += el.quantity)
    if (totalAvailable < soldQuantity) {
        alert(`غير متوفر في المخزن عدد ${soldQuantity-totalAvailable} من هذا المنتج وسيتم إضافته لقسم الطلبيات`)
        if (priceOnRetailOrOld.find(el => el.companyDiscount === 25) !== undefined) {
            let modified = priceOnRetailOrOld.shift();
            return [{ price: productPrice, quantity: soldQuantity - totalAvailable + modified.quantity, companyDiscount: 25, finalPriceBeforeDiscount: 0, finalPriceAfterDiscount: 0 }, ...priceOnRetailOrOld]
        } else {
            return [{ price: productPrice, quantity: soldQuantity - totalAvailable, companyDiscount: 25, finalPriceBeforeDiscount: 0, finalPriceAfterDiscount: 0 }, ...priceOnRetailOrOld]
        }
    } else {
        return priceOnRetailOrOld;
    }
}

// WarehouseItem data sample
// OLd: {
//   "id": "169841869",
//   "productId": "U4QG5mpfkB",
//   "availability": {
//     "25": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 3 }],
//       "companyDiscount": 25
//     },
//     "30": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 1 }],
//       "companyDiscount": 30
//     },
//     "35": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
//       "companyDiscount": 35
//     },
//     "40": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
//       "companyDiscount": 40
//     }
//   }
// }
// NEW: {
//   "id": "18949841648",
//   "productId": "Tadzn6pils",
//   "availability": {
//     "25": {
//       "quantities": [
//         { "priceHistoryDate": "2022-01-01", "quantity": 3 },
//         { "priceHistoryDate": "2022-02-01", "quantity": 4 }
//       ],
//       "companyDiscount": 25
//     },
//     "30": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
//       "companyDiscount": 30
//     },
//     "35": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
//       "companyDiscount": 35
//     },
//     "40": {
//       "quantities": [{ "priceHistoryDate": "2022-01-01", "quantity": 0 }],
//       "companyDiscount": 40
//     }
//   }
// }

let oldWHItem = { "id": "000001", "productId": "qquk-y4g_W", "availability": { "25": { "quantity": 1, "companyDiscount": 25 }, "35": { "quantity": "3", "companyDiscount": 35 } } }

// getOrderDetailsFromWarehouse(oldWHItem,2,4250)
// [ { price: 4250,
//   quantity: 1,
//   companyDiscount: 25,
//   finalPriceBeforeDiscount: 0,
//   finalPriceAfterDiscount: 0 },
// { price: 4250,
//   quantity: 1,
//   companyDiscount: '35',
//   finalPriceBeforeDiscount: 0,
//   finalPriceAfterDiscount: 0 } ]

let newWHItem = { "id": "000001", "productId": "qquk-y4g_W", "availability": { "25": { "quantity": 1, "companyDiscount": 25 }, "35": { "quantity": "3", "companyDiscount": 35 } } }

console.log(getOrderDetailsFromWarehouse(oldWHItem, 2, 4250))
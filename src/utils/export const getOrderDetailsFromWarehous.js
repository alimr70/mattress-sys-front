export const getOrderDetailsFromWarehouse = (warehouseItem, soldQuantity, productPrice, productPriceHistory) => {
  // "priceHistory": [
  // { "date": "2022-01-01", "price": 1832 }
  // { "date": "2022-02-01", "price": 1924 }
  // ],
  if (warehouseItem === undefined) {
    alert(`غير متوفر في المخزن عدد ${soldQuantity} من هذا المنتج وسيتم إضافته لقسم الطلبيات`);
    return [{ price: productPrice, quantity: soldQuantity, companyDiscount: 25, finalPriceBeforeDiscount: 0, finalPriceAfterDiscount: 0 }]
  }

  const priceOnRetailOrOld = [];

  const getTotalAvailableQuantitiesForDiscountSection = (discountSection) => {
    return Object.values(discountSection.quantities).reduce((accumulator, curr) => accumulator + curr)
  }

  const getPriceHistoryAndQuantityOfDiscountSection = (productPriceHistory, discountSectionQuantities, totalSectionAvailablity) => {
    let priceHistoryAndQuantityArr = [];
    let discountSectionQuantitiesDatesArr = Object.keys(discountSectionQuantities);

    let availabilityCount = totalSectionAvailablity;

    for (let i = 0; i <= discountSectionQuantitiesDatesArr.length - 1; i++) {
      if (availabilityCount === 0) return;
      const quantity = discountSectionQuantities[discountSectionQuantitiesDatesArr[i]];
      if (availabilityCount >= quantity) {
        priceHistoryAndQuantityArr.push({
          date: discountSectionQuantitiesDatesArr[i],
          price: productPriceHistory.find(priceRecord => priceRecord.date === discountSectionQuantitiesDatesArr[i]).price,
          quantity: quantity
        })

        availabilityCount = availabilityCount - quantity
      }

    }
    return priceHistoryAndQuantityArr
  }

  const countAvalabilityOfDiscountSection = (availabileDiscountSection, soldQuantity) => {
    const TotalSectionAvailablity = getTotalAvailableQuantitiesForDiscountSection(availabileDiscountSection);

    return TotalSectionAvailablity < soldQuantity ?
      TotalSectionAvailablity === 0 ? { remaining: soldQuantity - TotalSectionAvailablity } :
      priceOnRetailOrOld.push({
        // price: productPrice,
        // quantity: TotalSectionAvailablity,
        priceHistoryAndQuantity: getPriceHistoryAndQuantityOfDiscountSection(productPriceHistory, availabileDiscountSection.quantities, TotalSectionAvailablity),
        companyDiscount: availabileDiscountSection.companyDiscount,
        finalPriceBeforeDiscount: 0,
        finalPriceAfterDiscount: 0
      }) && { remaining: soldQuantity - TotalSectionAvailablity } :
      priceOnRetailOrOld.push({
        price: productPrice,
        quantity: soldQuantity,
        companyDiscount: availabileDiscountSection.companyDiscount,
        finalPriceBeforeDiscount: 0,
        finalPriceAfterDiscount: 0
      });
  };

  const cycleThroughAvailability = (availability, DiscountSectionNum, soldQuantity) => {
    if (DiscountSectionNum === 100 || soldQuantity === 0 || isNaN(soldQuantity)) return;

    if (availability[DiscountSectionNum] !== undefined) {
      const countOperation = countAvalabilityOfDiscountSection(
        availability[DiscountSectionNum],
        soldQuantity
      );
      if (
        countOperation.remaining !== undefined &&
        countOperation.remaining > 0
      ) {
        return cycleThroughAvailability(
          availability,
          DiscountSectionNum + 5,
          countOperation.remaining
        );
      }
    } else {
      return cycleThroughAvailability(
        availability,
        DiscountSectionNum + 5,
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

let whItem = {
  "id": "18949841648",
  "productId": "Tadzn6pils",
  "availability": {
    "25": {
      "quantities": {
        "2022-01-01": 1,
        "2022-02-01": 1
      },
      "companyDiscount": 25
    },
    "35": {
      "quantities": { "2022-01-01": 1 },
      "companyDiscount": 35
    }
  }
}

// expected result
// {
//   {
//     "priceHistoryAndQuantity": [
//       { "date": "2022-01-01", "price": 1832, "quantity": 1 },
//       { "date": "2022-03-01", "price": 1924, "quantity": 1 }
//     ],
//     "companyDiscount": 25,
//     "finalPriceBeforeDiscount": 0,
//     "finalPriceAfterDiscount": 0
//   },
//   {
//     "priceHistoryAndQuantity": [
//       { "date": "2022-01-01", "price": 1832, "quantity": 1 }
//     ],
//     "companyDiscount": 30,
//     "finalPriceBeforeDiscount": 0,
//     "finalPriceAfterDiscount": 0
//   }
// }

let priceHistory = [{ "date": "2022-01-01", "price": 1832 }, { "date": "2022-02-01", "price": 1924 }];

console.log(getOrderDetailsFromWarehouse(whItem, 3, 1924, priceHistory))
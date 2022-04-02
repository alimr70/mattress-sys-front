export const getOrderDetailsFromWarehouse = (warehouseItem, soldQuantity, productPrice) => {
  if (warehouseItem === undefined) {
    console.log(`غير متوفر في المخزن عدد ${soldQuantity} من هذا المنتج وسيتم إضافته لقسم الطلبيات`);
    return [{ price: productPrice, quantity: soldQuantity, companyDiscount: 25, finalPriceBeforeDiscount: 0, finalPriceAfterDiscount: 0 }]
  }

  const priceOnRetailOrOld = [];

  const getTotalAvailableQuantitiesForDiscountSection = (discountSection) => {
    // Sample
    //     "25": {
    //       "quantities": [
    //         { "priceHistoryDate": "2022-01-01", "quantity": 3 },
    //         { "priceHistoryDate": "2022-02-01", "quantity": 4 }
    //       ],
    let totalQuantity = 0;
    discountSection.quantities.forEach(priceDateRecord => totalQuantity += priceDateRecord.quantity)
    return totalQuantity;
  }

  const countAvalabilityOfDiscountSection = (availabileDiscountSection, soldQuantity) => {
    const TotalSectionAvailablity = getTotalAvailableQuantitiesForDiscountSection(availabileDiscountSection)

    // Remove at end
    console.log(TotalSectionAvailablity)

    return TotalSectionAvailablity < soldQuantity ?
      TotalSectionAvailablity === 0 ? { remaining: soldQuantity - TotalSectionAvailablity } :
      priceOnRetailOrOld.push({
        price: productPrice,
        quantity: TotalSectionAvailablity,
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

let oldWHItem = { "id": "000001", "productId": "qquk-y4g_W", "availability": { "25": { "quantity": 1, "companyDiscount": 25 }, "35": { "quantity": 3, "companyDiscount": 35 } } }

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

let newWHItem = {
  "id": "18949841648",
  "productId": "Tadzn6pils",
  "availability": {
    "25": {
      "quantities": {
        "2022-01-01": 3,
        "2022-02-01": 4
      },
      "companyDiscount": 25
    },
    "35": {
      "quantities": { "2022-01-01": 1 },
      "companyDiscount": 35
    }
  }
}

console.log(getOrderDetailsFromWarehouse(newWHItem, 2, 4250))
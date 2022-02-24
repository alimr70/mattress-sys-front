// Create a filter that takes any number of filter categories and return and arry of filtered results
export const repeatedFilter = (arr, filters) => {
  /**
   * Products array should be like:
   * [{ "id": "val", "type": "val", "name": "val", "thickness": "val", "width": "val", "height": "val", "price": "val", "warehouseId": "val" }]
   * Filters array should be like not all product properties should be included, but must not include name, price or warehouseId :
   * [
   *  {"type": typeVal},
   *  {"thickness": thicknessVal}
   * ]
   */
  if (filters.length === 0) return arr;

  let filterObj = filters[0];
  let filterKey = Object.keys(filterObj)[0];
  let filterVal = Object.values(filterObj)[0];

  if (filterVal === "all") return arr;
  if (typeof filterVal !== "string") {
    return arr.filter((el) => filterVal.includes(el[filterKey]));
  }
  arr = arr.filter((el) => el[filterKey].includes(filterVal));

  filters.shift();

  return repeatedFilter(arr, filters);
};

export const generateSerialNumber = (number) => {

  function repeatStringNumTimes(str, num) {
    return num > 0 ? str + repeatStringNumTimes(str, num - 1) : "";
  }

  const repeatTimes = (6 - number.length) <= 0 ? 0 : 6 - number.length;
  const zeros = repeatStringNumTimes("0", repeatTimes)

  return `${zeros}${number}`
}

export const handleNumberInputChange = (e, numberTarget, targetsArr) => {
  if (isNaN(+e.target.value))
    return targetsArr[numberTarget][1](targetsArr[numberTarget][0]);

  return targetsArr[numberTarget][1](e.target.value.trim());
};

export const getTotalAvailableItems = (arr) => {
  let number = 0;
  arr.forEach((el) => {
    number += el.quantity;
  });
  return number;
};

export const englishTypesToArabic = {
  pending: "معلقة",
  completed: "مقفولة",
  deleted: "ملغية",
  cash: "كاش",
  card: "كارت أونلاين",
  cashAndCard: "جزء كاش وجزء أونلاين",
  width: "العرض",
  height: "الطول",
  thickness: "الارتفاع",
  weight: "الوزن",
  price: "السعر"
}

export const getOrderDetailsFromWarehouse = (warehouseItem, soldQuantity, productPrice) => {
  // {"price": 4250, "quantity": 3, "companyDiscount": 25},{"price": 4250, "quantity": 1, "companyDiscount": 30}
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
};

export const getTotalOrdersArr = (invoices, productsData) => {
  let totalSoldInventory = {};

  invoices.forEach((invoice) => {
    invoice.order.forEach((orderItem) => {
      if (totalSoldInventory[orderItem.productId] !== undefined) {
        totalSoldInventory[orderItem.productId].quantity += orderItem.quantity
      } else {
        totalSoldInventory[orderItem.productId] = {
          productId: orderItem.productId,
          quantity: orderItem.quantity
        }
      }
    })
  })

  // Object.values(productsData).forEach((productItem) => {
  //   totalSoldInventory[productItem.id]?.name = productItem.name
  // })

  const totalSoldInventoryWithNames = Object.values(totalSoldInventory).map((inventoryItem) => {
    inventoryItem.name = productsData[inventoryItem.productId].name
    inventoryItem.type = productsData[inventoryItem.productId].type
    inventoryItem.thickness = productsData[inventoryItem.productId].thickness
    inventoryItem.width = productsData[inventoryItem.productId].width
    inventoryItem.height = productsData[inventoryItem.productId].height
    return inventoryItem
  })

  const totalSoldMattress = totalSoldInventoryWithNames.filter(product => product.type === "مرتبة" && !product.name.includes("بف"))

  // Get all soled mattress dimentions
  let availabeDimentions = []

  totalSoldMattress.forEach((item) => {
    availabeDimentions.push(`${item.width} × ${item.height}`)
  })

  const arrangedAvailableDimentions = [...new Set(availabeDimentions)].sort((a, b) => {
    if (+a.split(" ")[0] > +b.split(" ")[0]) return 1
    if (+a.split(" ")[0] === +b.split(" ")[0]) {
      if (+a.split(" ")[2] > +b.split(" ")[2]) { return 1 } else { return -1 }
    }
    return -1
      // if (+a.split(" ")[0] < +b.split(" ")[0]) return -1
  })

  return { totalSoldMattress, arrangedAvailableDimentions }
}
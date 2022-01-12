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

  // arr = arr.filter((el) => el[filterKey] === filterVal);
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
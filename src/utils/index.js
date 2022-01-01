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

  arr = arr.filter((el) => el[filterKey] === filterVal);

  filters.shift();

  return repeatedFilter(arr, filters);
};
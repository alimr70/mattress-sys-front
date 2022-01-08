import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import { handleNumberInputChange, repeatedFilter } from "../utils";
import ProductItem from "./ProductItem";
import WarehouseItem from "./WarehouseItem";

const Filter = ({ toBeFilteredArr }) => {
  const location = useLocation();
  const { pathname } = location;

  const { warehouseState } = useContext(WarehouseStore);
  // const warehouseItems = Object.values(warehouseState);

  const { generalTypesState } = useContext(GeneralTypesStore);
  const productTypes = Object.values(generalTypesState.productTypes);

  const [filteredProductsArr, setFilteredProductsArr] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState("");
  const [thicknessFilter, setThicknessFilter] = useState("");

  const numberTargets = {
    thicknessFilter: [thicknessFilter, setThicknessFilter],
    widthFilter: [widthFilter, setWidthFilter],
    heightFilter: [heightFilter, setHeightFilter],
  };

  useEffect(() => {
    const filters = [];
    typeFilter !== "" && filters.push({ type: typeFilter });
    widthFilter !== "" && filters.push({ width: widthFilter });
    heightFilter !== "" && filters.push({ height: heightFilter });
    thicknessFilter !== "" && filters.push({ thickness: thicknessFilter });

    const filteredProductsArr = repeatedFilter(toBeFilteredArr, filters);
    setFilteredProductsArr(filteredProductsArr);
  }, [
    toBeFilteredArr,
    setFilteredProductsArr,
    typeFilter,
    widthFilter,
    heightFilter,
    thicknessFilter,
  ]);

  return (
    <>
      {/* Filter */}
      <div className="m-5 grid xs:grid-cols-4 gap-2">
        <div className="col-span-1">
          <select
            className="w-full text-gray-800"
            name="typeFilter"
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}>
            <option className="text-center text-gray-500" value="" defaultValue>
              كل الأنواع
            </option>
            {productTypes.map((el, index) => (
              <option
                className="text-center text-gray-800"
                value={el}
                key={index}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="thicknessFilter">العرض:</label>
          <input
            dir="ltr"
            inputMode="numeric"
            type="text"
            name="widthFilter"
            id="widthFilter"
            className="w-full text-center text-gray-800"
            value={widthFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "widthFilter", numberTargets);
            }}
          />
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="thicknessFilter">الطول:</label>
          <input
            dir="ltr"
            inputMode="numeric"
            type="text"
            name="heightFilter"
            id="heightFilter"
            className="w-full text-center text-gray-800"
            value={heightFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "heightFilter", numberTargets);
            }}
          />
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="thicknessFilter">الارتفاع:</label>
          <input
            dir="ltr"
            inputMode="numeric"
            type="text"
            name="thicknessFilter"
            id="thicknessFilter"
            className="w-full text-center text-gray-800"
            value={thicknessFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "thicknessFilter", numberTargets);
            }}
          />
        </div>
      </div>
      <div>
        <ul className="flex justify-end flex-col">
          {pathname === "/products" &&
            filteredProductsArr.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          {pathname === "/warehouse" &&
            filteredProductsArr
              .filter(
                (product) => warehouseState[product.warehouseId] !== undefined
              )
              .map((filteredProduct) => {
                return (
                  <WarehouseItem
                    key={filteredProduct.warehouseId}
                    item={warehouseState[filteredProduct.warehouseId]}
                  />
                );
              })}
        </ul>
      </div>
    </>
  );
};

export default Filter;

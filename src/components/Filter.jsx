import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import { handleNumberInputChange, repeatedFilter } from "../utils";
import InvoiceItem from "./InvoiceItem";
import ProductItem from "./ProductItem";
import WarehouseItem from "./WarehouseItem";

const Filter = ({ toBeFilteredProductsArr }) => {
  const location = useLocation();
  const { pathname } = location;

  const { warehouseState } = useContext(WarehouseStore);

  const { generalTypesState } = useContext(GeneralTypesStore);
  const productTypes = Object.values(generalTypesState.productTypes);

  const [filteredProductsArr, setFilteredProductsArr] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState("");
  const [thicknessFilter, setThicknessFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [cstNameFilter, setCstNameFilter] = useState("");

  const numberTargets = {
    idFilter: [idFilter, setIdFilter],
    thicknessFilter: [thicknessFilter, setThicknessFilter],
    widthFilter: [widthFilter, setWidthFilter],
    heightFilter: [heightFilter, setHeightFilter],
    phoneFilter: [phoneFilter, setPhoneFilter],
  };

  useEffect(() => {
    const filters = [];
    idFilter !== "" && filters.push({ id: idFilter });
    typeFilter !== "" && filters.push({ type: typeFilter });
    widthFilter !== "" && filters.push({ width: widthFilter });
    heightFilter !== "" && filters.push({ height: heightFilter });
    thicknessFilter !== "" && filters.push({ thickness: thicknessFilter });
    phoneFilter !== "" && filters.push({ phone: phoneFilter });
    dateFilter !== "" && filters.push({ invoiceDate: dateFilter });
    cstNameFilter !== "" && filters.push({ cutomerName: cstNameFilter });

    let delay = setTimeout(() => {
      const filteredProductsArr = repeatedFilter(
        toBeFilteredProductsArr,
        filters
      );
      setFilteredProductsArr(filteredProductsArr);
    }, 300);

    return () => {
      clearTimeout(delay);
    };
  }, [
    toBeFilteredProductsArr,
    setFilteredProductsArr,
    idFilter,
    typeFilter,
    widthFilter,
    heightFilter,
    thicknessFilter,
    phoneFilter,
    dateFilter,
    cstNameFilter,
  ]);

  return (
    <>
      {/* Filter */}
      <div className="m-5 grid xs:grid-cols-4 gap-2">
        {(pathname === "/products" || pathname === "/warehouse") && (
          <>
            <div className="col-span-1">
              <select
                className="w-full text-gray-800"
                name="typeFilter"
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}>
                <option
                  className="text-center text-gray-500"
                  value=""
                  defaultValue>
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
          </>
        )}
        {pathname === "/invoices" && (
          <>
            <div className="col-span-1 flex">
              <label htmlFor="idFilter">رقم الفاتورة:</label>
              <input
                dir="ltr"
                inputMode="numeric"
                type="text"
                name="idFilter"
                id="idFilter"
                className="w-full text-center text-gray-800"
                value={idFilter}
                onChange={(e) => {
                  handleNumberInputChange(e, "idFilter", numberTargets);
                }}
              />
            </div>
            <div className="col-span-1 flex">
              <label htmlFor="phoneFilter">تليفون العميل:</label>
              <input
                dir="ltr"
                inputMode="numeric"
                type="text"
                name="phoneFilter"
                id="phoneFilter"
                className="w-full text-center text-gray-800"
                value={phoneFilter}
                onChange={(e) => {
                  handleNumberInputChange(e, "phoneFilter", numberTargets);
                }}
              />
            </div>
            <div className="col-span-1 flex">
              <label htmlFor="dateFilter">تاريخ الفاتورة:</label>
              <input
                type="date"
                name="dateFilter"
                id="dateFilter"
                className="col-span-2 text-center text-gray-800"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                }}
              />
            </div>
            <div className="col-span-1 flex">
              <label htmlFor="cstNameFilter">اسم العميل:</label>
              <input
                type="text"
                name="cstNameFilter"
                id="cstNameFilter"
                className="col-span-2 text-center text-gray-800"
                value={cstNameFilter}
                onChange={(e) => {
                  setCstNameFilter(e.target.value);
                }}
              />
            </div>
          </>
        )}
      </div>
      <div>
        <ul className="flex justify-end flex-col">
          {pathname === "/products" &&
            filteredProductsArr.map((product) => {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <ProductItem product={product} />
                </Link>
              );
            })}
          {pathname === "/warehouse" &&
            filteredProductsArr
              .filter(
                (product) => warehouseState[product.warehouseId] !== undefined
              )
              .map((filteredProduct) => {
                return (
                  <Link
                    to={`/warehouse/${filteredProduct.warehouseId}`}
                    key={filteredProduct.warehouseId}>
                    <WarehouseItem
                      item={warehouseState[filteredProduct.warehouseId]}
                    />
                  </Link>
                );
              })}
          {pathname === "/invoices" &&
            filteredProductsArr.map((item) => {
              return (
                <Link key={item.id} to={`/invoices/${item.id}`}>
                  <InvoiceItem item={item} />
                </Link>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Filter;

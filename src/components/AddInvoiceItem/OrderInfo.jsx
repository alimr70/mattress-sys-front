import { TrashIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useState } from "react";
import { GeneralTypesStore } from "../../contexts/generalTypesContext";
import { ProductsStore } from "../../contexts/productsContext";
import { WarehouseStore } from "../../contexts/warehouseContext";
import {
  getOrderDetailsFromWarehouse,
  handleNumberInputChange,
  repeatedFilter,
} from "../../utils/index";
import ProductItem from "../ProductItem";

const OrderInfo = ({ order, setOrder }) => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productsState } = useContext(ProductsStore);
  const { warehouseState } = useContext(WarehouseStore);
  const { productTypes } = generalTypesState;

  const [quantity, setQuantity] = useState("1");
  const [retailOffer, setRetailOffer] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState("");
  const [thicknessFilter, setThicknessFilter] = useState("");
  const [totalSelectedPrice, setTotalSelectedPrice] = useState("");

  const products = Object.values(productsState);

  const filters = [];
  typeFilter !== "" && filters.push({ type: typeFilter });
  productNameFilter !== "" && filters.push({ name: productNameFilter });
  widthFilter !== "" && filters.push({ width: widthFilter });
  heightFilter !== "" && filters.push({ height: heightFilter });
  thicknessFilter !== "" && filters.push({ thickness: thicknessFilter });

  const filteredProductsArr = repeatedFilter(products, filters);

  const numberTargets = {
    quantity: [quantity, setQuantity],
    retailOffer: [retailOffer, setRetailOffer],
    thicknessFilter: [thicknessFilter, setThicknessFilter],
    widthFilter: [widthFilter, setWidthFilter],
    heightFilter: [heightFilter, setHeightFilter],
  };

  useEffect(() => {
    let totalPrice = 0;
    order.forEach((item) => {
      totalPrice = totalPrice + item.totalQuantityPrice;
    });
    setTotalSelectedPrice(totalPrice);
  }, [order]);

  return (
    <>
      <div className="m-5 grid grid-cols-3">
        <h1 className="my-3 text-xl">بيانات الطلب</h1>
      </div>

      {/* Order list */}
      <div className="m-5 mx-0">
        {order.map((item, index) => {
          const productItem = productsState[item.productId];
          return (
            <div
              className="my-1 flex items-center justify-between border-2 border-gray-400"
              key={index}>
              <TrashIcon
                className="h-10 w-10 xs:h-7 xs:w-7 text-red-600 cursor-pointer"
                onClick={() =>
                  setOrder([
                    ...order.filter((el) => el.productId !== item.productId),
                  ])
                }
              />
              {/* key={productItem.id} */}
              <ProductItem product={productItem} />
              <span>
                العدد: <span className="text-yellow-500">{item.quantity}</span>
              </span>
              {item.retailOffer !== 0 && (
                <span>
                  خصم: <span className="text-red-500">{item.retailOffer}%</span>
                </span>
              )}
              <span>
                السعر للعدد:{" "}
                <span className="text-lime-600">{item.totalQuantityPrice}</span>
              </span>
            </div>
          );
        })}
        <div className="my-1 flex items-center justify-center border-2 border-gray-400">
          <p>المجموع الكلي: </p>
          <span className="text-lime-600">{totalSelectedPrice}</span>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex my-1">
        <label htmlFor="quantity">الكمية المطلوبة من المنتج الذي ستضيفه:</label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="quantity"
          id="quantity"
          className="text-center text-gray-800"
          value={quantity}
          onChange={(e) => {
            handleNumberInputChange(e, "quantity", numberTargets);
          }}
        />
      </div>

      {/* Retail offer */}
      <div className="flex my-1">
        <label htmlFor="quantity">خصم من المعرض علي المنتج الذي ستضيفه:</label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="retailOffer"
          id="retailOffer"
          className="text-center text-gray-800"
          value={retailOffer}
          onChange={(e) => {
            handleNumberInputChange(e, "retailOffer", numberTargets);
          }}
        />
        %
      </div>

      {/* Filter */}
      <div className="m-5 grid xs:grid-cols-5 gap-2">
        <div className="col-span-1">
          <select
            className="w-full text-gray-800"
            name="typeFilter"
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}>
            <option className="text-center text-gray-500" value="" defaultValue>
              إختر النوع
            </option>
            {productTypes.map((el, index) => (
              <option
                className="text-center text-gray-800"
                value={el}
                key={index}>
                {el}
              </option>
            ))}
            <option className="text-center text-gray-800" value="all">
              كل الأنواع
            </option>
          </select>
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="productNameFilter">الاسم:</label>
          <input
            type="text"
            name="productNameFilter"
            id="productNameFilter"
            className="w-full text-center text-gray-800"
            value={productNameFilter}
            onChange={(e) => {
              setProductNameFilter(e.target.value);
            }}
          />
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

      <div className="flex my-1">
        <button
          className=" px-5 py-2 bg-red-500 rounded-md"
          onClick={() => {
            setTypeFilter("");
            setProductNameFilter("");
            setWidthFilter("");
            setHeightFilter("");
            setThicknessFilter("");
          }}>
          مسح الفلاتر
        </button>
      </div>

      <SelectProductTypeAndName
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        productNameFilter={productNameFilter}
        setProductNameFilter={setProductNameFilter}
        numberTargets={numberTargets}>
        <FilteredProductsList
          filteredProductsArr={filteredProductsArr}
          setOrder={setOrder}
          order={order}
          quantity={quantity}
          retailOffer={retailOffer}
          warehouseState={warehouseState}
          setQuantity={setQuantity}
          setRetailOffer={setRetailOffer}
        />
      </SelectProductTypeAndName>
    </>
  );
};

const FilteredProductsList = ({
  filteredProductsArr,
  setOrder,
  order,
  quantity,
  retailOffer,
  warehouseState,
  setQuantity,
  setRetailOffer,
}) => {
  return (
    <div className="m-5">
      <ul>
        {filteredProductsArr.map((item, index) => {
          return (
            <div
              className="flex items-center justify-center cursor-pointer"
              key={index}
              onClick={() => {
                setOrder([
                  ...order,
                  {
                    productId: item.id,
                    warehouseId: item.warehouseId,
                    quantity: +quantity,
                    retailOffer: retailOffer === "" ? 0 : +retailOffer,
                    priceOnRetailOrOld: getOrderDetailsFromWarehouse(
                      warehouseState[item.warehouseId] !== undefined
                        ? warehouseState[item.warehouseId]
                        : undefined,
                      +quantity,
                      item.price
                    ).reduce(
                      // I added the reduce func to convert order array to object like in dbSample.json file because I did't want to mess with getOrderDetailsFromWarehouse function
                      (prev, current) => ({
                        ...prev,
                        [current.companyDiscount]: { ...current },
                      }),
                      {}
                    ),
                    totalQuantityPrice:
                      retailOffer !== ""
                        ? item.price * quantity -
                          Math.ceil(
                            (item.price * quantity * +retailOffer) / 100
                          )
                        : item.price * quantity,
                  },
                ]);
                setQuantity(1);
                setRetailOffer("");
              }}>
              <ProductItem product={item} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const SelectProductTypeAndName = ({
  typeFilter,
  setTypeFilter,
  productNameFilter,
  setProductNameFilter,
  numberTargets,
  children,
}) => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productTypes } = generalTypesState;
  const lessKnownProducts = productTypes.filter((el) => {
    return el !== "مرتبة" && el !== "مخدة" && el !== "ميلتون" && el !== "توبر";
  });

  if (typeFilter !== "" && productNameFilter !== "") {
    return children;
  }

  if (
    typeFilter === "all" ||
    typeFilter === "توبر" ||
    typeFilter === "ميلتون" ||
    typeof typeFilter !== "string"
  ) {
    return children;
  }

  return (
    <div className="my-2 w-full max-w-lg mx-auto grid gap-4 grid-cols-1 xs:grid-cols-3 sm:grid-cols-3">
      {typeFilter === "" && (
        <>
          <SelectProductTypeAndNameCell
            title="مراتب"
            selectedVal="مرتبة"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="مخدات"
            selectedVal="مخدة"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="ميلتون"
            selectedVal="ميلتون"
            setFn={setTypeFilter}
          />

          <SelectProductTypeAndNameCell
            title="توبر ميموري"
            selectedVal="توبر"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="منتجات أُخري"
            selectedVal={lessKnownProducts}
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="كل المنتجات"
            selectedVal="all"
            setFn={setTypeFilter}
          />
        </>
      )}
      {typeFilter === "مرتبة" && (
        <>
          <SelectProductTypeAndNameCell
            title="متصلة 20"
            selectedVal="ريترو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="متصلة 26"
            selectedVal="جولدن"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="متصلة 30"
            selectedVal="دودو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="طبية 15"
            selectedVal="ماريو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="طبية 20"
            selectedVal="ماريو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="طبية 25"
            selectedVal="ماريو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="منفصلة - سو - 25"
            selectedVal="سو"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="ميموري22"
            selectedVal="ميموري22"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="بف"
            selectedVal="بف"
            setFn={setProductNameFilter}
          />
        </>
      )}
      {typeFilter === "مخدة" && (
        <>
          <SelectProductTypeAndNameCell
            title="طبية"
            selectedVal="طبية"
            setFn={setProductNameFilter}
          />
          <SelectProductTypeAndNameCell
            title="ريلاكس"
            selectedVal="ريلاكس"
            setFn={setProductNameFilter}
          />
          <SelectProductTypeAndNameCell
            title="فيبر"
            selectedVal="فيبر"
            setFn={setProductNameFilter}
          />
        </>
      )}
    </div>
  );
};

const SelectProductTypeAndNameCell = ({
  title,
  selectedVal,
  setFn,
  numberTargets,
}) => {
  const possibleThickness = ["15", "20", "25", "26", "30"];
  return (
    <div
      className="col-span-1 h-28 grid bg-gray-700 rounded-md w-full items-center justify-center cursor-pointer"
      onClick={() => {
        setFn(selectedVal);
        numberTargets !== undefined &&
          possibleThickness.forEach(
            (thickness) =>
              title.includes(thickness) &&
              handleNumberInputChange(
                { target: { value: thickness } },
                "thicknessFilter",
                numberTargets
              )
          );
      }}>
      <h1 className="text-3lg font-bold text-gray-300 select-none">{title}</h1>
    </div>
  );
};

export default OrderInfo;

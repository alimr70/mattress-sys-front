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
        <h1 className="my-3 text-xl">???????????? ??????????</h1>
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
                ??????????: <span className="text-yellow-500">{item.quantity}</span>
              </span>
              {item.retailOffer !== 0 && (
                <span>
                  ??????: <span className="text-red-500">{item.retailOffer}%</span>
                </span>
              )}
              <span>
                ?????????? ??????????:{" "}
                <span className="text-lime-600">{item.totalQuantityPrice}</span>
              </span>
            </div>
          );
        })}
        <div className="my-1 flex items-center justify-center border-2 border-gray-400">
          <p>?????????????? ??????????: </p>
          <span className="text-lime-600">{totalSelectedPrice}</span>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex my-1">
        <label htmlFor="quantity">???????????? ???????????????? ???? ???????????? ???????? ????????????:</label>
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
        <label htmlFor="quantity">?????? ???? ???????????? ?????? ???????????? ???????? ????????????:</label>
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
              ???????? ??????????
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
              ???? ??????????????
            </option>
          </select>
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="productNameFilter">??????????:</label>
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
          <label htmlFor="thicknessFilter">??????????:</label>
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
          <label htmlFor="thicknessFilter">??????????:</label>
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
          <label htmlFor="thicknessFilter">????????????????:</label>
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
          ?????? ??????????????
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
          setTypeFilter={setTypeFilter}
          setProductNameFilter={setProductNameFilter}
          setWidthFilter={setWidthFilter}
          setHeightFilter={setHeightFilter}
          setThicknessFilter={setThicknessFilter}
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
  setTypeFilter,
  setProductNameFilter,
  setWidthFilter,
  setHeightFilter,
  setThicknessFilter,
}) => {
  return (
    <div className="m-5">
      <ul>
        {filteredProductsArr.map((item, index) => {
          const itemLastPrice =
            item.priceHistory[item.priceHistory.length - 1].price;
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
                      +itemLastPrice,
                      item.priceHistory
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
                        ? itemLastPrice * quantity -
                          Math.ceil(
                            (itemLastPrice * quantity * +retailOffer) / 100
                          )
                        : itemLastPrice * quantity,
                  },
                ]);
                setQuantity(1);
                setRetailOffer("");
                // clear filters
                setTypeFilter("");
                setProductNameFilter("");
                setWidthFilter("");
                setHeightFilter("");
                setThicknessFilter("");
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
    return el !== "??????????" && el !== "????????" && el !== "????????????" && el !== "????????";
  });

  if (typeFilter !== "" && productNameFilter !== "") {
    return children;
  }

  if (
    typeFilter === "all" ||
    typeFilter === "????????" ||
    typeFilter === "????????????" ||
    typeof typeFilter !== "string"
  ) {
    return children;
  }

  return (
    <div className="my-2 w-full max-w-lg mx-auto grid gap-4 grid-cols-1 xs:grid-cols-3 sm:grid-cols-3">
      {typeFilter === "" && (
        <>
          <SelectProductTypeAndNameCell
            title="??????????"
            selectedVal="??????????"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="??????????"
            selectedVal="????????"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="????????????"
            selectedVal="????????????"
            setFn={setTypeFilter}
          />

          <SelectProductTypeAndNameCell
            title="???????? ????????????"
            selectedVal="????????"
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="???????????? ??????????"
            selectedVal={lessKnownProducts}
            setFn={setTypeFilter}
          />
          <SelectProductTypeAndNameCell
            title="???? ????????????????"
            selectedVal="all"
            setFn={setTypeFilter}
          />
        </>
      )}
      {typeFilter === "??????????" && (
        <>
          <SelectProductTypeAndNameCell
            title="?????????? 20"
            selectedVal="??????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="?????????? 26"
            selectedVal="??????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="?????????? 30"
            selectedVal="????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="???????? 15"
            selectedVal="??????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="???????? 20"
            selectedVal="??????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="???????? 25"
            selectedVal="??????????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="???????????? - ???? - 25"
            selectedVal="????"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="????????????22"
            selectedVal="????????????22"
            setFn={setProductNameFilter}
            numberTargets={numberTargets}
          />
          <SelectProductTypeAndNameCell
            title="????"
            selectedVal="????"
            setFn={setProductNameFilter}
          />
        </>
      )}
      {typeFilter === "????????" && (
        <>
          <SelectProductTypeAndNameCell
            title="????????"
            selectedVal="????????"
            setFn={setProductNameFilter}
          />
          <SelectProductTypeAndNameCell
            title="????????????"
            selectedVal="????????????"
            setFn={setProductNameFilter}
          />
          <SelectProductTypeAndNameCell
            title="????????"
            selectedVal="????????"
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

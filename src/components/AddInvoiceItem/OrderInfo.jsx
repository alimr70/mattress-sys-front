import { PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useState } from "react";
import { GeneralTypesStore } from "../../contexts/generalTypesContext";
import { ProductsStore } from "../../contexts/productsContext";
import { handleNumberInputChange, repeatedFilter } from "../../utils/index";
import ProductItem from "../ProductItem";

const OrderInfo = ({ order, setOrder }) => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productsState } = useContext(ProductsStore);
  const productTypes = Object.values(generalTypesState.productTypes);

  const [quantity, setQuantity] = useState("1");
  const [retailOffer, setRetailOffer] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState("");
  const [thicknessFilter, setThicknessFilter] = useState("");
  const [totalSelectedPrice, setTotalSelectedPrice] = useState("");

  const products = Object.values(productsState);

  const filters = [];
  typeFilter !== "" && filters.push({ type: typeFilter });
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
    let num = 0;
    order.forEach((item) => {
      num = num + item.totalQuantityPrice;
    });
    setTotalSelectedPrice(num);
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

      <div className="m-5">
        <ul>
          {filteredProductsArr.map((item, index) => {
            return (
              <div className="flex items-center justify-center" key={index}>
                <ProductItem product={item} />
                <PlusCircleIcon
                  className="h-10 w-10 xs:h-7 xs:w-7 cursor-pointer"
                  onClick={() => {
                    setOrder([
                      ...order,
                      {
                        productId: item.id,
                        warehouseId: item.warehouseId,
                        quantity: quantity,
                        retailOffer: retailOffer === "" ? 0 : +retailOffer,
                        oldPrice: {
                          price: 0,
                          quantity: 0,
                        },
                        totalQuantityPrice:
                          retailOffer !== ""
                            ? item.price -
                              Math.ceil(
                                (item.price * quantity * +retailOffer) / 100
                              )
                            : item.price * quantity,
                      },
                    ]);
                    setQuantity(1);
                    setRetailOffer("");
                  }}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default OrderInfo;

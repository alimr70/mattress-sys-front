import { useContext, useState } from "react";
import { ProductsStore } from "../contexts/productsContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import {
  addExistingWarehouseItem,
  addNewWarehouseItem,
} from "../contexts/warehouseContext/warehouseActions";
import { handleNumberInputChange } from "../utils";

const AddWarehouseItem = () => {
  const { productsState } = useContext(ProductsStore);
  const { warehouseState, warehouseDispatch } = useContext(WarehouseStore);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [companyDiscount, setCompanyDiscount] = useState("25");

  const products = Object.values(productsState);
  const productWarehouseId = productsState[productId]?.warehouseId;

  const numberTargets = {
    quantity: [quantity, setQuantity],
    companyDiscount: [companyDiscount, setCompanyDiscount],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundTargetWarehouseItem = warehouseState[productWarehouseId];
    if (foundTargetWarehouseItem) {
      const targetCompanyDiscount =
        foundTargetWarehouseItem.availability[companyDiscount];

      if (targetCompanyDiscount) {
        const item = {
          ...foundTargetWarehouseItem,
          availability: {
            ...foundTargetWarehouseItem.availability,
            [targetCompanyDiscount.companyDiscount]: {
              ...targetCompanyDiscount,
              quantity: targetCompanyDiscount.quantity + +quantity,
            },
          },
        };
        console.log({ step1: item });
        warehouseDispatch(addExistingWarehouseItem(item));
      } else if (!targetCompanyDiscount) {
        const item = {
          ...foundTargetWarehouseItem,
          availability: {
            ...foundTargetWarehouseItem.availability,
            [companyDiscount]: {
              quantity,
              companyDiscount,
            },
          },
        };
        console.log({ step2: item });
        warehouseDispatch(addExistingWarehouseItem(item));
      }
    } else {
      let availability = {
        [companyDiscount]: {
          quantity: +quantity,
          companyDiscount: +companyDiscount,
        },
      };

      const item = {
        id: productWarehouseId,
        productId,
        availability: availability,
      };
      warehouseDispatch(addNewWarehouseItem(item));
    }
    setProductId("");
    setQuantity("");
    setCompanyDiscount("25");
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="max-w-sm mx-auto"
      autoComplete="off">
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="type" className="m-2 col-span-1 justify-self-start">
          إختر المنتج
        </label>
        <select
          name="item"
          id="selectItem"
          className="col-span-2 text-gray-800"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required>
          <option className="text-center text-gray-500" value="" defaultValue>
            إختر المنتج
          </option>
          {products.map((product) => {
            return (
              <option
                key={product.id}
                value={product.id}
                className="text-center text-gray-800">
                {product.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="quantity" className="m-2 col-span-1 justify-self-start">
          العدد
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="quantity"
          id="quantity"
          className="col-span-2 text-center text-gray-800"
          value={quantity}
          onChange={(e) => {
            handleNumberInputChange(e, "quantity", numberTargets);
          }}
          required
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="quantity" className="m-2 col-span-1 justify-self-start">
          خصم الشركة
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="companyDiscount"
          id="companyDiscount"
          className="col-span-2 text-center text-gray-800"
          value={companyDiscount}
          onChange={(e) => {
            handleNumberInputChange(e, "companyDiscount", numberTargets);
          }}
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-5 py-2 bg-blue-500 rounded-md">
          إضافة مخزون
        </button>
      </div>
    </form>
  );
};

export default AddWarehouseItem;

import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { ProductsStore } from "../contexts/productsContext";

const AddWarehouseItem = () => {
  const { productsState } = useContext(ProductsStore);
  const products = Object.values(productsState);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [companyDiscount, setCompanyDiscount] = useState("25");

  const handleNumberInputChange = (e, numberTarget) => {
    const numberTargets = {
      quantity: [quantity, setQuantity],
      companyDiscount: [companyDiscount, setCompanyDiscount],
    };

    if (isNaN(+e.target.value))
      return numberTargets[numberTarget][1](numberTargets[numberTarget][0]);

    return numberTargets[numberTarget][1](e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="max-w-sm mx-auto">
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="type"
          className="m-2 col-span-1 order-last justify-self-end">
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
        <label
          htmlFor="quantity"
          className="m-2 col-span-1 order-last justify-self-end">
          العدد
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="quantity"
          id="quantity"
          className="col-span-2 text-center text-gray-800"
          value={quantity}
          onChange={(e) => {
            handleNumberInputChange(e, "quantity");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="quantity"
          className="m-2 col-span-1 order-last justify-self-end">
          خصم الشركة
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="companyDiscount"
          id="companyDiscount"
          className="col-span-2 text-center text-gray-800"
          value={companyDiscount}
          onChange={(e) => {
            handleNumberInputChange(e, "companyDiscount");
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

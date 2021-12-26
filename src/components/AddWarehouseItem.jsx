import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { ProductsStore } from "../contexts/productsContext";

const AddWarehouseItem = () => {
  const { productsState } = useContext(ProductsStore);
  const products = Object.values(productsState);
  const [productId, setProductId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
    </form>
  );
};

export default AddWarehouseItem;

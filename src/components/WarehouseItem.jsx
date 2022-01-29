import { useContext } from "react";
import { ProductsStore } from "../contexts/productsContext";
import { getTotalAvailableItems } from "../utils";

const WarehouseItem = ({ item }) => {
  const { productId, availability } = item;
  const { productsState } = useContext(ProductsStore);
  const product = productsState[productId];
  const availableItems = Object.values(availability);
  let numberOfAvailableItems = getTotalAvailableItems(availableItems);
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-evenly md:justify-between flex-row text-right">
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          <span className="text-blue-500">{product.type}</span>
        </p>
        <p className="m-1">
          <span className="text-blue-500">{product.name}</span>
        </p>
      </div>
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          السعر: <span className="text-green-500">{product.price}</span>
        </p>
        <p className="m-1">
          العدد: <span className="text-blue-500">{numberOfAvailableItems}</span>
        </p>
      </div>
    </li>
  );
};

export default WarehouseItem;

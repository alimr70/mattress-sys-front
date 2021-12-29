import { useContext } from "react/cjs/react.development";
import { ProductsStore } from "../contexts/productsContext";

const getTotalAvailableItems = (arr) => {
  let number = 0;
  arr.forEach((el) => {
    number += el.quantity;
  });
  return number;
};

const WarehouseItem = ({ item }) => {
  const { productId, availability } = item;
  const { productsState } = useContext(ProductsStore);
  const product = productsState[productId];
  let numberOfAvailableItems = getTotalAvailableItems(availability);
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-evenly md:justify-between flex-row text-right">
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          المنتج: <span className="text-blue-500">{product.type}</span>
        </p>
        <p className="m-1">
          الاسم: <span className="text-blue-500">{product.name}</span>
        </p>
      </div>
      {/* <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          الارتفاع: <span className="text-blue-500">{product.thickness}</span>
        </p>
        <p className="m-1">
          العرض: <span className="text-blue-500">{product.width}</span>
        </p>
        <p className="m-1">
          الطول: <span className="text-blue-500">{product.height}</span>
        </p>
      </div> */}
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          السعر: <span className="text-green-500">{product.price}</span>
        </p>
        <p className="m-1">
          العدد بالمخزن:{" "}
          <span className="text-blue-500">{numberOfAvailableItems}</span>
        </p>
      </div>
    </li>
  );
};

export default WarehouseItem;

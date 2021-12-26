import { useContext } from "react/cjs/react.development";
import { ProductsStore } from "../contexts/productsContext";

const WarehouseItem = ({ item }) => {
  const { productId, quantity } = item;
  const { productsState } = useContext(ProductsStore);
  const product = productsState[productId];
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-evenly md:justify-between flex-row-reverse text-right">
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          المنتج: <span className="text-blue-500">{product.type}</span>
        </p>
        <p className="m-1">
          الاسم: <span className="text-blue-500">{product.name}</span>
        </p>
      </div>
      {/* <div className="p-2 ti:flex flex-row-reverse">
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
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          السعر: <span className="text-green-500">{product.price}</span>
        </p>
        <p className="m-1">
          العدد بالمخزن: <span className="text-blue-500">{quantity}</span>
        </p>
      </div>
    </li>
  );
};

export default WarehouseItem;

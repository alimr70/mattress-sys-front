import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsStore } from "../contexts/productsContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import { getTotalAvailableItems } from "../utils";

const DetailWarehouseItem = () => {
  const { warehouseItemId } = useParams();
  const { warehouseState } = useContext(WarehouseStore);
  const warehouseItem = warehouseState[warehouseItemId];
  const { productsState } = useContext(ProductsStore);
  const product = productsState[warehouseItem.productId];
  const availableItems = Object.values(warehouseItem.availability);
  let numberOfAvailableItems = getTotalAvailableItems(availableItems);

  return (
    <>
      <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
        <div className="col-span-1 justify-self-center text-2xl">
          تفاصيل المنتج بالمخزن
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">النوع: </span>
          <span className="justify-self-start">{product.type}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">الاسم: </span>
          <span className="justify-self-start">{product.name}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">العدد الكلي: </span>
          <span className="justify-self-start">{numberOfAvailableItems}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-start">
            الاعداد تفصيلا حسب نسبة الخصم:
          </span>
        </div>
        {availableItems.map((item, index) => {
          return (
            <div key={index} className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">%{item.companyDiscount}:</span>
              <span className="justify-self-start">{item.quantity}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailWarehouseItem;

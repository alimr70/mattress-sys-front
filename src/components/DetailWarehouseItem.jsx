import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsStore } from "../contexts/productsContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import { getTotalAvailableItems } from "../utils";
import { DetailsProperty } from "./SharedComponents";

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
        <DetailsProperty title={"النوع"} property={product.type} />
        <DetailsProperty title={"الاسم"} property={product.name} />
        <DetailsProperty
          title={"العدد الكلي"}
          property={numberOfAvailableItems}
        />
        <DetailsProperty
          title={"الاعداد تفصيلا حسب نسبة الخصم"}
          property={""}
        />
        {availableItems.map((item, index) => {
          return (
            <DetailsProperty
              key={index}
              title={`%${item.companyDiscount}`}
              property={item.quantity}
            />
          );
        })}
      </div>
    </>
  );
};

export default DetailWarehouseItem;

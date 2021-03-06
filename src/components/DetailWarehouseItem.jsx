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
          property={
            <span className="text-green-400 font-bold">
              {numberOfAvailableItems}
            </span>
          }
        />
        <DetailsProperty
          title={"الاعداد تفصيلا حسب نسبة الخصم"}
          property={""}
        />
        {availableItems.map((item, index) => {
          let quantityDates = Object.keys(item.quantities);
          return (
            <div key={index}>
              <DetailsProperty
                title={`%${item.companyDiscount}`}
                property={""}
              />
              {quantityDates.map((date, index) => {
                return (
                  <DetailsProperty
                    key={index}
                    title={date}
                    property={
                      <span className="text-green-500 font-bold">
                        {item.quantities[date]}
                      </span>
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailWarehouseItem;

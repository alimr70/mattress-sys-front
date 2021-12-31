import { PlusCircleIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { ProductsStore } from "../contexts/productsContext";
import { WarehouseStore } from "../contexts/warehouseContext";
import ProductItem from "./ProductItem";

const AddInvoiceItem = () => {
  const [cstName, setCstName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [invocieDate, setInvocieDate] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [order, setOrder] = useState([]);

  const handleNumberInputChange = (e, numberTarget) => {
    const numberTargets = {
      phone: [phone, setPhone],
      phoneTwo: [phoneTwo, setPhoneTwo],
    };

    if (isNaN(+e.target.value))
      return numberTargets[numberTarget][1](numberTargets[numberTarget][0]);

    return numberTargets[numberTarget][1](e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-2xl mx-auto"
        autoComplete="off">
        {/* <CstInfo
          cstName={cstName}
          setCstName={setCstName}
          address={address}
          setAddress={setAddress}
          phone={phone}
          phoneTwo={phoneTwo}
          handleNumberInputChange={handleNumberInputChange}
        />
        <PaymentInfo
          invocieDate={invocieDate}
          setInvocieDate={setInvocieDate}
          receiptDate={receiptDate}
          setReceiptDate={setReceiptDate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        /> */}
        <OrderInfo order={order} setOrder={setOrder} />
        <div className="flex justify-center">
          <button type="submit" className="px-5 py-2 bg-blue-500 rounded-md">
            إضافة
          </button>
        </div>
      </form>
    </>
  );
};

const CstInfo = ({
  cstName,
  setCstName,
  address,
  setAddress,
  phone,
  handleNumberInputChange,
  phoneTwo,
}) => {
  return (
    <>
      {/* Cst info */}
      <div className="m-5 grid grid-cols-3">
        <h1 className="my-3 text-xl">بيانات العميل</h1>
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="cstName" className="m-2 col-span-1 justify-self-start">
          الاسم
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="cstName"
          id="cstName"
          className="col-span-2 text-center text-gray-800"
          value={cstName}
          onChange={(e) => {
            setCstName(e.target.value);
          }}
          required
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="address" className="m-2 col-span-1 justify-self-start">
          العنوان
        </label>
        <input
          lang="ar-EG"
          inputMode="numeric"
          type="text"
          name="address"
          id="address"
          className="col-span-2 text-center text-gray-800"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="phone" className="m-2 col-span-1 justify-self-start">
          رقم التليفون
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="phone"
          id="phone"
          className="col-span-2 text-center text-gray-800"
          value={phone}
          onChange={(e) => {
            handleNumberInputChange(e, "phone");
          }}
          required
          maxLength={11}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="phoneTwo" className="m-2 col-span-1 justify-self-start">
          رقم تليفون آخر
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="phoneTwo"
          id="phoneTwo"
          className="col-span-2 text-center text-gray-800"
          value={phoneTwo}
          onChange={(e) => {
            handleNumberInputChange(e, "phoneTwo");
          }}
          maxLength={11}
        />
      </div>
    </>
  );
};

const PaymentInfo = ({
  invocieDate,
  setInvocieDate,
  receiptDate,
  setReceiptDate,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <>
      {/* Payment info */}
      <div className="m-5 grid grid-cols-3">
        <h1 className="my-3 text-xl">بيانات الدفع والاستلام</h1>
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="invocieDate"
          className="m-2 col-span-1 justify-self-start">
          تاريخ الفاتورة
        </label>
        <input
          type="date"
          name="invocieDate"
          id="invocieDate"
          className="col-span-2 text-center text-gray-800"
          value={invocieDate}
          onChange={(e) => {
            console.log(e.target.value);
            setInvocieDate(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="receiptDate"
          className="m-2 col-span-1 justify-self-start">
          تاريخ الاستلام
        </label>
        <input
          type="date"
          name="receiptDate"
          id="receiptDate"
          className="col-span-2 text-center text-gray-800"
          value={receiptDate}
          onChange={(e) => {
            setReceiptDate(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="paymentMethod"
          className="m-2 col-span-1 justify-self-start">
          طريقة الدفع
        </label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          className="col-span-2 text-center text-gray-800"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">كاش</option>
          <option value="card">كارت أونلاين</option>
          <option value="both">جزء كاش وجزء أونلاين</option>
        </select>
      </div>
    </>
  );
};

const OrderInfo = ({ order, setOrder }) => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productsState } = useContext(ProductsStore);
  const { warehouseState } = useContext(WarehouseStore);
  const productTypes = Object.values(generalTypesState.productTypes);

  const [quantity, setQuantity] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState("");
  const [thicknessFilter, setThicknessFilter] = useState("");
  // const [productId, setProductId] = useState("");

  // const warehouseItems = Object.values(warehouseState);
  const products = Object.values(productsState);

  const filters = [];
  typeFilter !== "" && filters.push({ type: typeFilter });
  widthFilter !== "" && filters.push({ width: widthFilter });
  heightFilter !== "" && filters.push({ height: heightFilter });
  thicknessFilter !== "" && filters.push({ thickness: thicknessFilter });

  const filteredProductsArr = repeatedFilter(products, filters);

  const handleNumberInputChange = (e, numberTarget) => {
    const numberTargets = {
      quantity: [quantity, setQuantity],
      thicknessFilter: [thicknessFilter, setThicknessFilter],
      widthFilter: [widthFilter, setWidthFilter],
      heightFilter: [heightFilter, setHeightFilter],
    };

    if (isNaN(+e.target.value))
      return numberTargets[numberTarget][1](numberTargets[numberTarget][0]);

    return numberTargets[numberTarget][1](e.target.value.trim());
  };

  return (
    <>
      <div className="m-5 grid grid-cols-3">
        <h1 className="my-3 text-xl">بيانات الطلب</h1>
      </div>

      {/* Order list */}
      <div className="m-5">
        {order.map((item, index) => {
          const productItem = productsState[item.productId];
          return (
            <div className="flex items-center justify-center" key={index}>
              <ProductItem product={productItem} key={productItem.id} />
              العدد: {item.quantity} السعر للعدد: {item.price}
            </div>
          );
        })}
      </div>

      {/* Quantity */}
      <div className="flex">
        <label htmlFor="quantity">الكمية المطلوبة من المنتج الذي ستضيفه:</label>
        <input
          inputMode="numeric"
          type="text"
          name="quantity"
          id="quantity"
          className="text-center text-gray-800"
          value={quantity}
          onChange={(e) => {
            handleNumberInputChange(e, "quantity");
          }}
        />
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
            inputMode="numeric"
            type="text"
            name="widthFilter"
            id="widthFilter"
            className="w-full text-center text-gray-800"
            value={widthFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "widthFilter");
            }}
          />
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="thicknessFilter">الطول:</label>
          <input
            inputMode="numeric"
            type="text"
            name="heightFilter"
            id="heightFilter"
            className="w-full text-center text-gray-800"
            value={heightFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "heightFilter");
            }}
          />
        </div>
        <div className="col-span-1 flex">
          <label htmlFor="thicknessFilter">الارتفاع:</label>
          <input
            inputMode="numeric"
            type="text"
            name="thicknessFilter"
            id="thicknessFilter"
            className="w-full text-center text-gray-800"
            value={thicknessFilter}
            onChange={(e) => {
              handleNumberInputChange(e, "thicknessFilter");
            }}
          />
        </div>
      </div>

      <div className="m-5">
        <ul>
          {filteredProductsArr.map((item) => {
            return (
              <div className="flex items-center justify-center">
                <ProductItem key={item.id} product={item} />
                <PlusCircleIcon
                  className="h-5 w-5 xs:h-7 xs:w-7 cursor-pointer"
                  onClick={() => {
                    setOrder([
                      ...order,
                      {
                        productId: item.id,
                        quantity: quantity,
                        price: item.price * quantity,
                      },
                    ]);
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

const getTotalAvailableItems = (arr) => {
  let number = 0;
  arr.forEach((el) => {
    number += el.quantity;
  });
  return number;
};

// Create a filter that takes any number of filter categories and return and arry of filtered results
const repeatedFilter = (arr, filters) => {
  /**
   * Products array should be like:
   * [{ "id": "val", "type": "val", "name": "val", "thickness": "val", "width": "val", "height": "val", "price": "val", "warehouseId": "val" }]
   * Filters array should be like not all product properties should be included, but must not include name, price or warehouseId :
   * [
   *  {"type": typeVal},
   *  {"thickness": thicknessVal}
   * ]
   */
  if (filters.length === 0) return arr;

  let filterObj = filters[0];
  let filterKey = Object.keys(filterObj)[0];
  let filterVal = Object.values(filterObj)[0];

  arr = arr.filter((el) => el[filterKey] === filterVal);

  filters.shift();

  return repeatedFilter(arr, filters);
};

export default AddInvoiceItem;

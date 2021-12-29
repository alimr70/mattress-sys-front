import { useState } from "react";

const AddInvoiceItem = () => {
  const [cstName, setCstName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [invocieDate, setInvocieDate] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("كاش");

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
        className="max-w-sm mx-auto"
        autoComplete="off">
        <div className="m-5 grid grid-cols-3">
          <label
            htmlFor="cstName"
            className="m-2 col-span-1 justify-self-start">
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
          <label
            htmlFor="address"
            className="m-2 col-span-1 justify-self-start">
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
          <label
            htmlFor="phoneTwo"
            className="m-2 col-span-1 justify-self-start">
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
            تاريخ الفاتورة
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
        <div className="flex justify-center">
          <button type="submit" className="px-5 py-2 bg-blue-500 rounded-md">
            إضافة
          </button>
        </div>
      </form>
    </>
  );
};

export default AddInvoiceItem;

const PaymentInfo = ({
  invocieDate,
  setInvocieDate,
  receiptDate,
  setReceiptDate,
  paymentMethod,
  setPaymentMethod,
  shipmentOnCst,
  shipmentOnRetail,
  handleNumberInputChange,
  step,
  setStep,
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
            setInvocieDate(e.target.value);
          }}
          required
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
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="shipmentOnCst"
          className="m-2 col-span-1 justify-self-start">
          تكلفة الشحن علي العميل
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="shipmentOnCst"
          id="shipmentOnCst"
          className="col-span-2 text-center text-gray-800"
          value={shipmentOnCst}
          onChange={(e) => {
            handleNumberInputChange(e, "shipmentOnCst");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="shipmentOnRetail"
          className="m-2 col-span-1 justify-self-start">
          تكلفة الشحن علي المعرض
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="shipmentOnRetail"
          id="shipmentOnRetail"
          className="col-span-2 text-center text-gray-800"
          value={shipmentOnRetail}
          onChange={(e) => {
            handleNumberInputChange(e, "shipmentOnRetail");
          }}
        />
      </div>

      {/* 
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="shipmentOnRetail"
          className="m-2 col-span-1 justify-self-start">
          تكلفة الشحن علي المعرض
        </label>
        <input
          type="text"
          name="shipmentOnRetail"
          id="shipmentOnRetail"
          className="col-span-2 text-center text-gray-800"
          value={shipmentOnRetail}
          onChange={(e) => {
            handleNumberInputChange(e, "shipmentOnRetail");
          }}
        />
      </div> */}
    </>
  );
};

export default PaymentInfo;

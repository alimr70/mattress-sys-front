const PaymentInfo = ({
  invoiceDate,
  setInvoiceDate,
  receiptDate,
  setReceiptDate,
  paymentMethod,
  setPaymentMethod,
  shipmentOnCst,
  shipmentOnRetail,
  handleNumberInputChange,
  totalRetailOfferName,
  setTotalRetailOfferName,
  totalRetailOfferAmountPrecentage,
  setTotalRetailOfferAmountPrecentage,
  totalRetailOfferAmountFixed,
  setTotalRetailOfferAmountFixed,
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
          htmlFor="invoiceDate"
          className="m-2 col-span-1 justify-self-start">
          تاريخ الفاتورة*
        </label>
        <input
          type="date"
          name="invoiceDate"
          id="invoiceDate"
          className="col-span-2 text-center text-gray-800"
          value={invoiceDate}
          onChange={(e) => {
            setInvoiceDate(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="receiptDate"
          className="m-2 col-span-1 justify-self-start">
          تاريخ الاستلام*
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
          طريقة الدفع*
        </label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          className="col-span-2 text-center text-gray-800"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">كاش</option>
          <option value="card">كارت أونلاين</option>
          <option value="cashAndCard">جزء كاش وجزء أونلاين</option>
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
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="totalRetailOfferName"
          className="m-2 col-span-1 justify-self-start">
          اسم الخصم علي كل المنتجات
        </label>
        <input
          type="text"
          name="totalRetailOfferName"
          id="totalRetailOfferName"
          className="col-span-2 text-center text-gray-800"
          value={totalRetailOfferName}
          onChange={(e) => {
            setTotalRetailOfferName(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="totalRetailOfferAmountPrecentage"
          className="m-2 col-span-1 justify-self-start">
          نسبة الخصم
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="totalRetailOfferAmountPrecentage"
          id="totalRetailOfferAmountPrecentage"
          className="col-span-2 text-center text-gray-800"
          value={totalRetailOfferAmountPrecentage}
          onChange={(e) => {
            handleNumberInputChange(e, "totalRetailOfferAmountPrecentage");
            setTotalRetailOfferAmountFixed("");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="totalRetailOfferAmountFixed"
          className="m-2 col-span-1 justify-self-start">
          أو قيمة الخصم المحددة
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="totalRetailOfferAmountFixed"
          id="totalRetailOfferAmountFixed"
          className="col-span-2 text-center text-gray-800"
          value={totalRetailOfferAmountFixed}
          onChange={(e) => {
            handleNumberInputChange(e, "totalRetailOfferAmountFixed");
            setTotalRetailOfferAmountPrecentage("");
          }}
        />
      </div>
    </>
  );
};

export default PaymentInfo;

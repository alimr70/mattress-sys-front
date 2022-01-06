const PaymentInfo = ({
  invoiceDate,
  setInvoiceDate,
  receiptDate,
  setReceiptDate,
  paidMoney,
  paymentMethod,
  setPaymentMethod,
  cashAmount,
  cardAmound,
  shipmentOnCst,
  shipmentOnRetail,
  handleNumberInputChange,
  totalRetailOfferName,
  setTotalRetailOfferName,
  totalRetailOfferAmountPrecentage,
  setTotalRetailOfferAmountPrecentage,
  totalRetailOfferAmountFixed,
  setTotalRetailOfferAmountFixed,
  isOffer,
  setIsOffer,
  isPartialAmount,
  setIsPartialAmount,
  isShipment,
  setIsShipment,
}) => {
  console.log(paidMoney);
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
      {paymentMethod === "cashAndCard" && (
        <>
          <div className="m-5 grid grid-cols-3">
            <label
              htmlFor="cashAmount"
              className="m-2 col-span-1 justify-self-start">
              قيمة الكاش*
            </label>
            <input
              inputMode="numeric"
              type="text"
              name="cashAmount"
              id="cashAmount"
              className="col-span-2 text-center text-gray-800"
              value={cashAmount}
              onChange={(e) => {
                handleNumberInputChange(e, "cashAmount");
              }}
            />
          </div>
          <div className="m-5 grid grid-cols-3">
            <label
              htmlFor="cardAmound"
              className="m-2 col-span-1 justify-self-start">
              قيمة الفيزا*
            </label>
            <input
              inputMode="numeric"
              type="text"
              name="cardAmound"
              id="cardAmound"
              className="col-span-2 text-center text-gray-800"
              value={cardAmound}
              onChange={(e) => {
                handleNumberInputChange(e, "cardAmound");
              }}
            />
          </div>
        </>
      )}
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="isPartialAmount"
          className="m-2 col-span-1 justify-self-start">
          هل العميل سيدفع عربون؟
        </label>
        <input
          type="checkbox"
          name="isPartialAmount"
          id="isPartialAmount"
          className="col-span-2 self-center text-gray-800"
          checked={isPartialAmount}
          onChange={() => {
            setIsPartialAmount(!isPartialAmount);
          }}
        />
      </div>
      {isPartialAmount && (
        <>
          <div className="m-5 grid grid-cols-3">
            <label
              htmlFor="paidMoney"
              className="m-2 col-span-1 justify-self-start">
              قيمة العربون*
            </label>
            <input
              inputMode="numeric"
              type="text"
              name="paidMoney"
              id="paidMoney"
              className="col-span-2 text-center text-gray-800"
              value={paidMoney}
              onChange={(e) => {
                handleNumberInputChange(e, "paidMoney");
              }}
            />
          </div>
        </>
      )}
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="isShipment"
          className="m-2 col-span-1 justify-self-start">
          هل العميل يريد نقل؟
        </label>
        <input
          type="checkbox"
          name="isShipment"
          id="isShipment"
          className="col-span-2 self-center text-gray-800"
          checked={isShipment}
          onChange={() => {
            setIsShipment(!isShipment);
          }}
        />
      </div>
      {isShipment && (
        <>
          <div className="m-5 grid grid-cols-3">
            <label
              htmlFor="shipmentOnCst"
              className="m-2 col-span-1 justify-self-start">
              تكلفة النقل علي العميل
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
              تكلفة النقل علي المعرض
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
        </>
      )}
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="isOffer" className="m-2 col-span-1 justify-self-start">
          هل يوجد خصم علي كل المنتجات؟
        </label>
        <input
          type="checkbox"
          name="isOffer"
          id="isOffer"
          className="col-span-2 self-center text-gray-800"
          checked={isOffer}
          onChange={() => {
            setIsOffer(!isOffer);
          }}
        />
      </div>
      {isOffer && (
        <>
          <div className="m-5 grid grid-cols-3">
            <label
              htmlFor="totalRetailOfferName"
              className="m-2 col-span-1 justify-self-start">
              اسم الخصم
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
      )}
    </>
  );
};

export default PaymentInfo;

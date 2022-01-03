import { useState } from "react";
import CstInfo from "./CstInfo";
import PaymentInfo from "./PaymentInfo";
import OrderInfo from "./OrderInfo";
import ReviewInvoice from "./ReviewInvoice";
import { useEffect } from "react/cjs/react.development";

const AddInvoiceItem = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [step, setStep] = useState(1);
  const [cstName, setCstName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [order, setOrder] = useState([]);
  const [shipmentOnCst, setShipmentOnCst] = useState("");
  const [shipmentOnRetail, setShipmentOnRetail] = useState("");
  const [totalRetailOfferName, setTotalRetailOfferName] = useState("");
  const [
    totalRetailOfferAmountPrecentage,
    setTotalRetailOfferAmountPrecentage,
  ] = useState("");
  const [totalRetailOfferAmountFixed, setTotalRetailOfferAmountFixed] =
    useState("");

  const handleNumberInputChange = (e, numberTarget) => {
    const numberTargets = {
      phone: [phone, setPhone],
      phoneTwo: [phoneTwo, setPhoneTwo],
      shipmentOnCst: [shipmentOnCst, setShipmentOnCst],
      shipmentOnRetail: [shipmentOnRetail, setShipmentOnRetail],
      totalRetailOfferAmountPrecentage: [
        totalRetailOfferAmountPrecentage,
        setTotalRetailOfferAmountPrecentage,
      ],
      totalRetailOfferAmountFixed: [
        totalRetailOfferAmountFixed,
        setTotalRetailOfferAmountFixed,
      ],
    };

    if (isNaN(+e.target.value))
      return numberTargets[numberTarget][1](numberTargets[numberTarget][0]);

    return numberTargets[numberTarget][1](e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const stepsNav = {
    1: (
      <CstInfo
        cstName={cstName}
        setCstName={setCstName}
        address={address}
        setAddress={setAddress}
        phone={phone}
        phoneTwo={phoneTwo}
        handleNumberInputChange={handleNumberInputChange}
        step={step}
        setStep={setStep}
      />
    ),
    2: (
      <PaymentInfo
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        receiptDate={receiptDate}
        setReceiptDate={setReceiptDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        shipmentOnCst={shipmentOnCst}
        shipmentOnRetail={shipmentOnRetail}
        handleNumberInputChange={handleNumberInputChange}
        totalRetailOfferName={totalRetailOfferName}
        setTotalRetailOfferName={setTotalRetailOfferName}
        totalRetailOfferAmountPrecentage={totalRetailOfferAmountPrecentage}
        setTotalRetailOfferAmountPrecentage={
          setTotalRetailOfferAmountPrecentage
        }
        totalRetailOfferAmountFixed={totalRetailOfferAmountFixed}
        setTotalRetailOfferAmountFixed={setTotalRetailOfferAmountFixed}
        step={step}
        setStep={setStep}
      />
    ),
    3: (
      <OrderInfo
        order={order}
        setOrder={setOrder}
        step={step}
        setStep={setStep}
      />
    ),
    4: (
      <ReviewInvoice
        cstName={cstName}
        address={address}
        phone={phone}
        phoneTwo={phoneTwo}
        invoiceDate={invoiceDate}
        receiptDate={receiptDate}
        paymentMethod={paymentMethod}
        order={order}
        shipmentOnCst={shipmentOnCst}
        shipmentOnRetail={shipmentOnRetail}
        totalRetailOfferName={totalRetailOfferName}
        totalRetailOfferAmountPrecentage={totalRetailOfferAmountPrecentage}
        totalRetailOfferAmountFixed={totalRetailOfferAmountFixed}
      />
    ),
  };

  useEffect(() => {
    if (
      cstName === "" ||
      address === "" ||
      phone === "" ||
      invoiceDate === "" ||
      receiptDate === "" ||
      paymentMethod === "" ||
      order.length === 0
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [cstName, address, phone, invoiceDate, receiptDate, paymentMethod, order]);

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-2xl mx-auto print:mx-0"
        autoComplete="off">
        {stepsNav[step]}
        <div className="flex justify-center">
          {step > 1 && (
            <button
              className="px-5 py-2 mx-2 bg-blue-500 rounded-md print:hidden"
              onClick={() => setStep(step - 1)}>
              السابق
            </button>
          )}
          {step < 3 && (
            <button
              className="px-5 py-2 mx-2 bg-blue-500 rounded-md"
              onClick={() => setStep(step + 1)}>
              التالي
            </button>
          )}
          {step === 3 && (
            <button
              className={
                "px-5 py-2 mx-2 bg-blue-500 rounded-md" +
                `${canSubmit ? "" : " cursor-not-allowed bg-gray-500"}`
              }
              onClick={() => {
                return canSubmit ? setStep(step + 1) : "";
              }}>
              مراجعة الفاتورة
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddInvoiceItem;

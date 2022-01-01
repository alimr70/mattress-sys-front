import { useState } from "react";
import CstInfo from "./CstInfo";
import PaymentInfo from "./PaymentInfo";
import OrderInfo from "./OrderInfo";

const AddInvoiceItem = () => {
  const [step, setStep] = useState(1);
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
        invocieDate={invocieDate}
        setInvocieDate={setInvocieDate}
        receiptDate={receiptDate}
        setReceiptDate={setReceiptDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
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
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-2xl mx-auto"
        autoComplete="off">
        {stepsNav[step]}
        <div className="flex justify-center">
          {step < 3 && (
            <button
              className="px-5 py-2 bg-blue-500 rounded-md"
              onClick={() => setStep(step + 1)}>
              التالي
            </button>
          )}
          {step > 1 && (
            <button
              className="px-5 py-2 bg-blue-500 rounded-md"
              onClick={() => setStep(step - 1)}>
              السابق
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="px-5 py-2 bg-blue-500 rounded-md">
              إضافة
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddInvoiceItem;

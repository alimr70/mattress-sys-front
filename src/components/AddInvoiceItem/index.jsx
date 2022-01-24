import { useContext, useState, useEffect } from "react";
import CstInfo from "./CstInfo";
import PaymentInfo from "./PaymentInfo";
import OrderInfo from "./OrderInfo";
import ReviewInvoice from "./ReviewInvoice";
import { addInvoiceItem } from "../../contexts/invoicesContext/invoicesActions";
import { InvoicesStore } from "../../contexts/invoicesContext";
import { GeneralTypesStore } from "../../contexts/generalTypesContext";
import { WarehouseStore } from "../../contexts/warehouseContext";
import { addSerialNumber } from "../../contexts/generalTypesContext/generalTypesActions";
import { removeSoldWarehouseItem } from "../../contexts/warehouseContext/warehouseActions";
import { useNavigate } from "react-router-dom";

const AddInvoiceItem = () => {
  const navigate = useNavigate();

  const { generalTypesDispatch } = useContext(GeneralTypesStore);
  const { warehouseDispatch } = useContext(WarehouseStore);
  const { invoicesDispatch } = useContext(InvoicesStore);

  const [canSubmit, setCanSubmit] = useState(false);
  const [step, setStep] = useState(1);
  const [cstName, setCstName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTwo, setPhoneTwo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashAmount, setCashAmount] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const [order, setOrder] = useState([]);
  const [isPartialAmount, setIsPartialAmount] = useState(false);
  const [paidMoney, setPaidMoney] = useState("");
  const [shipmentOnCst, setShipmentOnCst] = useState("");
  const [shipmentOnRetail, setShipmentOnRetail] = useState("");
  const [totalRetailOfferName, setTotalRetailOfferName] = useState("");
  const [
    totalRetailOfferAmountPrecentage,
    setTotalRetailOfferAmountPrecentage,
  ] = useState("");
  const [totalRetailOfferAmountFixed, setTotalRetailOfferAmountFixed] =
    useState("");
  const [totalInvoicePrice, setTotalInvoicePrice] = useState(0);
  const [remainingMoney, setRemainingMoney] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [isShipment, setIsShipment] = useState(false);

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
    cashAmount: [cashAmount, setCashAmount],
    cardAmount: [cardAmount, setCardAmount],
    totalInvoicePrice: [totalInvoicePrice, setTotalInvoicePrice],
    paidMoney: [paidMoney, setPaidMoney],
    serialNum: [serialNum, setSerialNum],
    remainingMoney: [remainingMoney, setRemainingMoney],
  };

  const handleSaveInvoice = () => {
    // {
    //   "status": ["pending", "completed", "deleted"]
    // }

    const invoice = {
      time: Date.now(),
      id: serialNum,
      cutomerName: cstName,
      address: address,
      phone: phone,
      phoneTwo: phoneTwo,
      invoiceDate: invoiceDate,
      receiptDate: receiptDate,
      order: order,
      paymentMethod: {
        method: paymentMethod,
        cashAmount: +cashAmount,
        cardAmount: +cardAmount,
      },
      shipmentCharge: {
        shipmentOnCst: +shipmentOnCst,
        shipmentOnRetail: +shipmentOnRetail,
      },
      totalRetailOffer: {
        name: totalRetailOfferName,
        percentage: +totalRetailOfferAmountPrecentage,
        fixed: +totalRetailOfferAmountFixed,
      },
      totalInvoicePrice: +totalInvoicePrice,
      paidMoney: +paidMoney === 0 ? +totalInvoicePrice : +paidMoney,
      remainingMoney: +remainingMoney,
      totalPriceOnRetail: 0,
      totalProfit: 0,
      status: "pending",
    };
    generalTypesDispatch(addSerialNumber(`${serialNum}`, "invoicesSerials"));
    invoicesDispatch(addInvoiceItem(invoice));
    order.forEach((item) => {
      warehouseDispatch(
        removeSoldWarehouseItem(item.warehouseId, item.quantity)
      );
    });
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSaveInvoice();
  };

  const stepsNav = {
    1: <OrderInfo order={order} setOrder={setOrder} />,
    2: (
      <PaymentInfo
        invoiceDate={invoiceDate}
        setInvoiceDate={setInvoiceDate}
        receiptDate={receiptDate}
        setReceiptDate={setReceiptDate}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cashAmount={cashAmount}
        cardAmount={cardAmount}
        shipmentOnCst={shipmentOnCst}
        shipmentOnRetail={shipmentOnRetail}
        numberTargets={numberTargets}
        totalRetailOfferName={totalRetailOfferName}
        setTotalRetailOfferName={setTotalRetailOfferName}
        totalRetailOfferAmountPrecentage={totalRetailOfferAmountPrecentage}
        setTotalRetailOfferAmountPrecentage={
          setTotalRetailOfferAmountPrecentage
        }
        totalRetailOfferAmountFixed={totalRetailOfferAmountFixed}
        setTotalRetailOfferAmountFixed={setTotalRetailOfferAmountFixed}
        isOffer={isOffer}
        setIsOffer={setIsOffer}
        isPartialAmount={isPartialAmount}
        setIsPartialAmount={setIsPartialAmount}
        isShipment={isShipment}
        setIsShipment={setIsShipment}
        paidMoney={paidMoney}
      />
    ),
    3: (
      <CstInfo
        cstName={cstName}
        setCstName={setCstName}
        address={address}
        setAddress={setAddress}
        phone={phone}
        phoneTwo={phoneTwo}
        numberTargets={numberTargets}
      />
    ),
    4: (
      <ReviewInvoice
        serialNum={serialNum}
        setSerialNum={setSerialNum}
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
        totalInvoicePrice={totalInvoicePrice}
        setTotalInvoicePrice={setTotalInvoicePrice}
        paidMoney={paidMoney}
        remainingMoney={remainingMoney}
        setRemainingMoney={setRemainingMoney}
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
        className={`${
          step === 4 ? "w-[20cm]" : "max-w-2xl"
        } mx-auto print:mx-0 print:w-full`}
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
          {step === 4 && (
            <button
              className="px-5 py-2 mx-2 bg-blue-500 rounded-md print:hidden"
              onClick={() => {
                handleSaveInvoice();
                window.print();
              }}>
              حفظ وطبع الفاتورة
            </button>
          )}
          {step === 4 && (
            <button
              className="px-5 py-2 mx-2 bg-blue-500 rounded-md print:hidden"
              onClick={() => {
                handleSaveInvoice();
              }}>
              حفظ فقط
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddInvoiceItem;

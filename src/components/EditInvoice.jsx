import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InvoicesStore } from "../contexts/invoicesContext";
import { editInvoiceSections } from "../contexts/invoicesContext/invoicesActions";
import { ProductsStore } from "../contexts/productsContext";
import { englishTypesToArabic, handleNumberInputChange } from "../utils";

const EditInvoice = ({ isEditMode }) => {
  const { invoiceId } = useParams();
  const { invoicesState, invoicesDispatch } = useContext(InvoicesStore);
  const invoiceItem = invoicesState[invoiceId];

  const [totalProductsCostOnRetail, setTotalProductsCostOnRetail] = useState(0);
  const [canCalc, setCanCalc] = useState(false);

  useEffect(() => {
    let priceOnRetailOrOldArr = [];
    invoiceItem.order.forEach((item) => {
      Object.values(item.priceOnRetailOrOld).forEach((el) =>
        priceOnRetailOrOldArr.push(el.finalPriceAfterDiscount)
      );
    });
    setTotalProductsCostOnRetail(
      priceOnRetailOrOldArr.reduce((prev, current) => {
        return prev + current;
      }, 0)
    );
    if (priceOnRetailOrOldArr.every((val) => val > 0)) {
      setCanCalc(true);
    } else {
      setCanCalc(false);
    }
  }, [invoiceItem, totalProductsCostOnRetail, canCalc]);

  const handleInvoiceCostCalc = () => {
    // Payment method cahsAndCard else if card else cash
    let invoiceCostAfterVisaDeduction = 0;
    // invoiceItem.totalInvoicePric
    if (invoiceItem.paymentMethod.method === "cashAndCard") {
      invoiceCostAfterVisaDeduction =
        invoiceItem.paymentMethod.cardAmount * 0.98 +
        invoiceItem.paymentMethod.cashAmount;
    } else if (invoiceItem.paymentMethod.method === "card") {
      invoiceCostAfterVisaDeduction = invoiceItem.totalInvoicePrice * 0.98;
    } else {
      invoiceCostAfterVisaDeduction = invoiceItem.totalInvoicePrice;
    }
    // invoice cost on retail after shipment
    const invoiceCostOnRetail =
      invoiceCostAfterVisaDeduction -
      invoiceItem.shipmentCharge.shipmentOnRetail;
    // Total invoice income/profit
    const invoiceIncome = invoiceCostOnRetail - totalProductsCostOnRetail;

    // Edit invoice
    invoicesDispatch(
      editInvoiceSections(invoiceItem, [
        { key: "totalPriceOnRetail", value: invoiceCostOnRetail },
        { key: "totalProfit", value: invoiceIncome },
      ])
    );
  };

  return (
    <>
      <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
        <div className="col-span-1 justify-self-center text-2xl">
          تفاصيل الفاتورة
        </div>
        <div className="col-span-1 justify-self-center text-2xl">
          حالة الفاتورة: {englishTypesToArabic[invoiceItem.status]}
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">رقم الفاتورة: </span>
          <span className="justify-self-start">{invoiceItem.id}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">الاسم: </span>
          <span className="justify-self-start">{invoiceItem.cutomerName}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">العنوان: </span>
          <span className="justify-self-start">{invoiceItem.address}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">رقم التليفون: </span>
          <span className="justify-self-start">{invoiceItem.phone}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">تليفون آخر: </span>
          <span className="justify-self-start">{invoiceItem.phoneTwo}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">تاريخ الفاتورة: </span>
          <span className="justify-self-start">{invoiceItem.invoiceDate}</span>
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-2">
          <span className="justify-self-end">تاريخ التسليم: </span>
          <span className="justify-self-start">{invoiceItem.receiptDate}</span>
        </div>
        <div className="col-span-1 border-2 border-gray-400">
          <span className="justify-self-end">الأوردر: </span>
          <OrderDetailsAndEdit
            order={invoiceItem.order}
            isEditMode={isEditMode}
          />
        </div>
        <div className="m-2 flex flex-col border-2 border-gray-400">
          <span className="justify-self-end">خصم المعرض:- </span>
          <span className="justify-self-start">
            اسم الخصم: {invoiceItem.totalRetailOffer.name}
          </span>
          <span className="justify-self-start">
            نسبة: {invoiceItem.totalRetailOffer.percentage}
          </span>
          <span className="justify-self-start">
            قيمة محددة: {invoiceItem.totalRetailOffer.fixed}
          </span>
        </div>
        <div className="m-2 flex flex-col border-2 border-gray-400">
          <span className="justify-self-end">النقل:- </span>
          <span className="justify-self-start">
            علي العميل: {invoiceItem.shipmentCharge.shipmentOnCst}
          </span>
          <span className="justify-self-start">
            علي المعرض: {invoiceItem.shipmentCharge.shipmentOnRetail}
          </span>
        </div>
        <div className="m-2 flex flex-col border-2 border-gray-400">
          <span className="justify-self-end">
            طريقة الدفع:
            {englishTypesToArabic[invoiceItem.paymentMethod.method]}
          </span>
          <span className="justify-self-end">
            المدفوع اونلاين: {invoiceItem.paymentMethod.cardAmount}
          </span>
          <span className="justify-self-end">
            المدفوع نقدا: {invoiceItem.paymentMethod.cashAmount}
          </span>
        </div>
        <div className="m-2 flex flex-col border-2 border-gray-400">
          <span className="justify-self-end">
            الإجمالي: {invoiceItem.totalInvoicePrice}
          </span>
          <span className="justify-self-end">
            المدفوع: {invoiceItem.paidMoney}
          </span>
          <span className="justify-self-end">
            المتبقي: {invoiceItem.remainingMoney}
          </span>
        </div>
        <div className="m-2 flex flex-col border-2 border-gray-400">
          <span className="justify-self-end">تقفيل الفاتورة:- </span>
          <span className="justify-self-start">
            إجمالي الفاتورة: {invoiceItem.totalInvoicePrice}
          </span>
          <span className="justify-self-start">
            تكلفة الفاتورة علي المعرض: {invoiceItem.totalPriceOnRetail}
          </span>
          <span className="justify-self-start">
            صافي ربح الفاتورة: {invoiceItem.totalProfit}
          </span>
        </div>
        <div className="m-2 grid">
          <button
            onClick={() => handleInvoiceCostCalc()}
            className={
              "px-5 py-2 mx-2 bg-blue-500 rounded-md" +
              `${canCalc ? "" : " cursor-not-allowed bg-gray-500"}`
            }>
            حساب تكلفة الفاتورة
          </button>
        </div>
      </div>
    </>
  );
};

const OrderDetailsAndEdit = ({ isEditMode, order }) => {
  return (
    <>
      {order.map((orderItem, index) => {
        return (
          <OrderDetailsItem
            key={index}
            isEditMode={isEditMode}
            orderItem={orderItem}
            orderIndex={index}
          />
        );
      })}
    </>
  );
};

const OrderDetailsItem = ({ isEditMode, orderItem, orderIndex }) => {
  const { productsState } = useContext(ProductsStore);
  let productItem = productsState[orderItem.productId];
  return (
    <div className="m-2 flex flex-col border-2 border-gray-400">
      <span>المنتج: {productItem.type + " " + productItem.name}</span>
      <span>الكمية: {orderItem.quantity}</span>
      <span>خصم خاص بالمنتج: {orderItem.retailOffer}</span>
      <span>إجمالي سعر المنتج للعميل: {orderItem.totalQuantityPrice}</span>
      <span>تكلفة المنتج علي المعرض:-</span>
      <div>
        {Object.values(orderItem.priceOnRetailOrOld).map((item, index) => {
          return (
            <PriceOnRetailItem
              key={index}
              item={item}
              isEditMode={isEditMode}
              orderIndex={orderIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

const PriceOnRetailItem = ({ item, isEditMode, orderIndex }) => {
  return (
    <div
      className={`m-1 flex ${
        isEditMode ? "flex-col" : "justify-around flex-wrap"
      } border-2 border-gray-400`}>
      <span>سعر الوحدة: {item.price}</span>
      <span>الكمية: {item.quantity}</span>
      <span>
        {isEditMode && "تعديل "}خصم الشركة: {item.companyDiscount}
      </span>
      {isEditMode && (
        <FinalProductSectionCostOrDiscount
          item={item}
          orderIndex={orderIndex}
          numTarget="companyDiscount"
        />
      )}
      <span>
        {isEditMode && "تعديل "}إجمالي سعر الوحدات قبل حساب خصم الشركة:
        {item.finalPriceBeforeDiscount}
      </span>
      {isEditMode && (
        <FinalProductSectionCostOrDiscount
          item={item}
          orderIndex={orderIndex}
          numTarget="finalPriceBeforeDiscount"
        />
      )}
      <span className="bg-green-700">
        {isEditMode && "تعديل "}إجمالي سعر الوحدات بعد حساب خصم الشركة:
        {item.finalPriceAfterDiscount}
      </span>
    </div>
  );
};

const FinalProductSectionCostOrDiscount = ({ item, orderIndex, numTarget }) => {
  const { invoiceId } = useParams();
  const { invoicesState, invoicesDispatch } = useContext(InvoicesStore);
  const invoiceItem = invoicesState[invoiceId];
  const [numInputVal, setNumInputVal] = useState("");

  const target = {
    numInputVal: [numInputVal, setNumInputVal],
  };

  const handleEditItemCompanyDiscount = () => {};

  const handleEditPriceOnRetailSection = () => {
    let targetOrderItem = invoiceItem.order[orderIndex];
    let newPriceOnRetailOrOld = {
      ...targetOrderItem.priceOnRetailOrOld,
      [item.companyDiscount]: {
        ...item,
        finalPriceBeforeDiscount:
          +numInputVal === 0 ? item.price * item.quantity : +numInputVal,
        finalPriceAfterDiscount:
          +numInputVal === 0
            ? item.price * item.quantity -
              (item.price * item.quantity * item.companyDiscount) / 100
            : +numInputVal - (+numInputVal * item.companyDiscount) / 100,
      },
    };
    targetOrderItem.priceOnRetailOrOld = newPriceOnRetailOrOld;

    let newOrder = invoiceItem.order;
    newOrder.splice(orderIndex, 1, targetOrderItem);

    invoicesDispatch(
      editInvoiceSections(invoiceItem, [{ key: "order", value: newOrder }])
    );

    setNumInputVal("");
  };

  return (
    <div className="flex">
      <input
        autoComplete="off"
        dir="ltr"
        inputMode="numeric"
        type="text"
        name="numInputVal"
        id="numInputVal"
        className="text-center text-gray-800"
        value={numInputVal}
        onChange={(e) => handleNumberInputChange(e, "numInputVal", target)}
      />

      {numTarget === "finalPriceBeforeDiscount" && (
        <button
          className="px-3 bg-blue-500 justify-self-center rounded-md"
          onClick={() => handleEditPriceOnRetailSection()}>
          {numInputVal === "" ? "احسب اوتوماتيكيا" : "تعديل يدويا"}
        </button>
      )}
      {numTarget === "companyDiscount" && (
        <button
          className="px-3 bg-blue-500 justify-self-center rounded-md"
          onClick={() => handleEditItemCompanyDiscount()}>
          تعديل خصم الشركة
        </button>
      )}
    </div>
  );
};

export default EditInvoice;

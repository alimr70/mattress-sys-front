import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthStore } from "../contexts/authContext";
import { InvoicesStore } from "../contexts/invoicesContext";
import {
  deleteInvoice,
  editInvoiceSections,
} from "../contexts/invoicesContext/invoicesActions";
import { ProductsStore } from "../contexts/productsContext";
import { englishTypesToArabic, handleNumberInputChange } from "../utils";
import { DetailsProperty } from "./SharedComponents";

const EditInvoice = ({
  isEditMode,
  askForDeleteMode,
  setAskForDeleteMode,
  isDeleteMode,
  setIsDeleteMode,
}) => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const { invoicesState, invoicesDispatch } = useContext(InvoicesStore);
  const invoiceItem = invoicesState[invoiceId];

  const handleInvoiceCostCalc = () => {
    let totalProductsCostOnRetail = 0;
    invoiceItem.order.forEach((orderItem, index) => {
      Object.values(orderItem.priceOnRetailOrOld).map((item) => {
        let finalItemCostOnRtail =
          item.finalPriceAfterDiscount === 0
            ? item.price * item.quantity -
              (item.price * item.quantity * item.companyDiscount) / 100
            : item.finalPriceAfterDiscount;

        totalProductsCostOnRetail += finalItemCostOnRtail;

        let newPriceOnRetailOrOld = {
          ...orderItem.priceOnRetailOrOld,
          [item.companyDiscount]: {
            ...item,
            finalPriceBeforeDiscount:
              item.finalPriceBeforeDiscount === 0
                ? item.price * item.quantity
                : item.finalPriceBeforeDiscount,
            finalPriceAfterDiscount: finalItemCostOnRtail,
          },
        };
        orderItem.priceOnRetailOrOld = newPriceOnRetailOrOld;

        let newOrder = invoiceItem.order;
        newOrder.splice(index, 1, orderItem);

        return invoicesDispatch(
          editInvoiceSections(invoiceItem, [{ key: "order", value: newOrder }])
        );
      });
    });

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
      (invoiceItem.shipmentCharge.shipmentOnRetail +
        invoiceItem.shipmentCharge.shipmentOnCst);
    // Total invoice income/profit
    const invoiceIncome = invoiceCostOnRetail - totalProductsCostOnRetail;

    // Edit invoice
    invoicesDispatch(
      editInvoiceSections(invoiceItem, [
        { key: "totalPriceOnRetail", value: totalProductsCostOnRetail },
        { key: "totalProfit", value: invoiceIncome },
      ])
    );
  };

  const handleDeleteInvoice = () => {
    invoicesDispatch(deleteInvoice(invoiceId));
    navigate("/invoices", { replace: true });
  };

  return (
    <div className="relative max-w-sm mx-auto grid grid-cols-1 gap-2">
      {askForDeleteMode && !isDeleteMode && (
        <DeleteModeWarning
          askForDeleteMode={askForDeleteMode}
          setAskForDeleteMode={setAskForDeleteMode}
          setIsDeleteMode={setIsDeleteMode}
        />
      )}
      <div className="col-span-1 justify-self-center text-2xl">
        تفاصيل الفاتورة
      </div>
      <div className="col-span-1 justify-self-center text-2xl">
        حالة الفاتورة: {englishTypesToArabic[invoiceItem.status]}
      </div>
      <DetailsProperty title={"رقم الفاتورة"} property={invoiceItem.id} />
      <DetailsProperty title={"الاسم"} property={invoiceItem.cutomerName} />
      <DetailsProperty title={"العنوان"} property={invoiceItem.address} />
      <DetailsProperty title={"رقم التليفون"} property={invoiceItem.phone} />
      <DetailsProperty title={"تليفون آخر"} property={invoiceItem.phoneTwo} />
      <DetailsProperty
        title={"تاريخ الفاتورة"}
        property={invoiceItem.invoiceDate}
      />
      <DetailsProperty
        title={"تاريخ التسليم"}
        property={invoiceItem.receiptDate}
      />
      <div className="col-span-1 border-2 border-gray-400">
        <span className="justify-self-end">الأوردر: </span>
        <OrderDetailsAndEdit
          order={invoiceItem.order}
          isEditMode={isEditMode}
          isDeleteMode={isDeleteMode}
          status={invoiceItem.status}
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
          {invoiceItem.status !== "deleted" &&
            isEditMode &&
            "تعديل تكلفة النقل "}
          علي المعرض: {invoiceItem.shipmentCharge.shipmentOnRetail}
        </span>
        {invoiceItem.status !== "deleted" && isEditMode && (
          <FinalProductSectionCostOrDiscount numTarget="shipmentOnRetail" />
        )}
      </div>
      <div className="m-2 flex flex-col border-2 border-gray-400">
        <span className="justify-self-end">
          طريقة الدفع:
          {englishTypesToArabic[invoiceItem.paymentMethod.method]}
        </span>
        <span className="justify-self-end">
          {invoiceItem.status !== "deleted" && isEditMode && "تعديل "}المدفوع
          اونلاين: {invoiceItem.paymentMethod.cardAmount}
        </span>
        {invoiceItem.status !== "deleted" && isEditMode && (
          <FinalProductSectionCostOrDiscount numTarget="cardAmount" />
        )}
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
      {invoiceItem.status !== "deleted" && (
        <div className="m-2 grid">
          <button
            onClick={() => handleInvoiceCostCalc()}
            className="px-5 py-2 mx-2 bg-blue-500 rounded-md">
            حساب تكلفة الفاتورة
          </button>
          {isDeleteMode && (
            <button
              onClick={() => handleDeleteInvoice()}
              className="my-1 px-5 py-2 mx-2 bg-red-500 rounded-md">
              إلغاء الفاتورة
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const OrderDetailsAndEdit = ({ isEditMode, order, status }) => {
  return (
    <>
      {order.map((orderItem, index) => {
        return (
          <OrderDetailsItem
            key={index}
            isEditMode={isEditMode}
            orderItem={orderItem}
            orderIndex={index}
            // isDeleteMode={isDeleteMode}
            status={status}
          />
        );
      })}
    </>
  );
};

const OrderDetailsItem = ({
  isEditMode,
  orderItem,
  orderIndex,
  // isDeleteMode,
  status,
}) => {
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
              status={status}
            />
          );
        })}
        {/* {isDeleteMode && (
          <>
            <div>
              <button
                className="m-1 p-1 bg-red-500 rounded-md"
                onClick={() => {
                  console.log(orderItem);
                }}>
                مسح المنتج بالكامل{" "}
              </button>
            </div>
            {orderItem.quantity > 1 && (
              <div>
                <button
                  className="m-1 p-1 bg-red-500 rounded-md"
                  onClick={() => {
                    console.log(orderItem);
                  }}>
                  مسح وحدة فقط{" "}
                </button>
              </div>
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

const PriceOnRetailItem = ({ item, isEditMode, orderIndex, status }) => {
  return (
    <div
      className={`m-1 flex ${
        status !== "deleted" && isEditMode
          ? "flex-col"
          : "justify-around flex-wrap"
      } border-2 border-gray-400`}>
      <span>سعر الوحدة: {item.price}</span>
      <span>الكمية: {item.quantity}</span>
      <span>
        {status !== "deleted" && isEditMode && "تعديل "}خصم الشركة:{" "}
        {item.companyDiscount}
      </span>
      {status !== "deleted" && isEditMode && (
        <FinalProductSectionCostOrDiscount
          item={item}
          orderIndex={orderIndex}
          numTarget="companyDiscount"
        />
      )}
      <span>
        {status !== "deleted" && isEditMode && "تعديل "}إجمالي سعر الوحدات قبل
        حساب خصم الشركة:
        {item.finalPriceBeforeDiscount}
      </span>
      {status !== "deleted" && isEditMode && (
        <FinalProductSectionCostOrDiscount
          item={item}
          orderIndex={orderIndex}
          numTarget="finalPriceBeforeDiscount"
        />
      )}
      <span className="bg-green-700">
        {status !== "deleted" && isEditMode && "تعديل "}إجمالي سعر الوحدات بعد
        حساب خصم الشركة:
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

  const handleEditItemCompanyDiscount = () => {
    if (numInputVal === "") return;
    let targetOrderItem = invoiceItem.order[orderIndex];
    let newPriceOnRetailOrOld = {
      ...targetOrderItem.priceOnRetailOrOld,
      [+numInputVal]: {
        ...item,
        companyDiscount: +numInputVal,
        finalPriceBeforeDiscount: 0,
        finalPriceAfterDiscount: 0,
      },
    };
    delete newPriceOnRetailOrOld[item.companyDiscount];
    targetOrderItem.priceOnRetailOrOld = newPriceOnRetailOrOld;

    let newOrder = invoiceItem.order;
    newOrder.splice(orderIndex, 1, targetOrderItem);

    invoicesDispatch(
      editInvoiceSections(invoiceItem, [{ key: "order", value: newOrder }])
    );

    setNumInputVal("");
  };

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

  const handleEditShipmentOnRetail = () => {
    // invoiceItem.shipmentCharge.shipmentOnRetail
    let newShipmentCharge = {
      ...invoiceItem.shipmentCharge,
      shipmentOnRetail: +numInputVal,
    };

    invoicesDispatch(
      editInvoiceSections(invoiceItem, [
        { key: "shipmentCharge", value: newShipmentCharge },
      ])
    );

    setNumInputVal("");
  };

  const handleEditCardAmount = () => {
    // {invoiceItem.paymentMethod.cardAmount}
    let newPaymentMethod = {
      ...invoiceItem.paymentMethod,
      cashAmount: +invoiceItem.totalInvoicePrice - +numInputVal,
      cardAmount: +numInputVal,
    };

    invoicesDispatch(
      editInvoiceSections(invoiceItem, [
        { key: "paymentMethod", value: newPaymentMethod },
      ])
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
          className="px-3 bg-blue-500 justify-self-center rounded-md section-cost-btn"
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
      {numTarget === "shipmentOnRetail" && (
        <button
          className="px-3 bg-blue-500 justify-self-center rounded-md"
          onClick={() => handleEditShipmentOnRetail()}>
          تعديل تكلفة النقل
        </button>
      )}
      {numTarget === "cardAmount" && (
        <button
          className="px-3 bg-blue-500 justify-self-center rounded-md"
          onClick={() => handleEditCardAmount()}>
          تعديل الأونلاين
        </button>
      )}
    </div>
  );
};

const DeleteModeWarning = ({ setIsDeleteMode, setAskForDeleteMode }) => {
  let { authState } = useContext(AuthStore);
  const [password, setPassWord] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      (authState.role === "programmer" &&
        password === process.env.REACT_APP_PROGRAMMER_PS) ||
      (authState.role === "manager" &&
        password === process.env.REACT_APP_MANAGER_PS) ||
      (authState.role === "accountant" &&
        password === process.env.REACT_APP_ACCOUNTANT_PS)
    ) {
      setIsDeleteMode(true);
    } else {
      setIsDeleteMode(false);
      setAskForDeleteMode(false);
    }
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full grid bg-gray-800">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="p-2 justify-self-center self-start grid grid-cols-3 gap-3 border-4 border-red-800">
        <label className="col-span-1">
          كلمة المرور الخاصة بالمستخدم الحالي:{" "}
        </label>
        <input
          className="px-2 col-span-2 text-gray-900"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1 justify-self-center bg-red-600 rounded-md col-span-3">
          تفعيل وضع الحذف
        </button>
        <button
          className="px-3 py-1 justify-self-center bg-blue-600 rounded-md col-span-3"
          onClick={() => setAskForDeleteMode(false)}>
          العودة
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;

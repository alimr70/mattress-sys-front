import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { InvoicesStore } from "../contexts/invoicesContext";
import { editInvoiceSection } from "../contexts/invoicesContext/invoicesActions";
import { ProductsStore } from "../contexts/productsContext";
import { englishTypesToArabic, handleNumberInputChange } from "../utils";

const EditInvoice = ({ isEditMode }) => {
  const { invoiceId } = useParams();
  const { invoicesState } = useContext(InvoicesStore);
  const invoiceItem = invoicesState[invoiceId];
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
            المدفوع اونلاين: {invoiceItem.paymentMethod.cardAmound}
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
      <span>إجمالي السعر للمنتج: {orderItem.totalQuantityPrice}</span>
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
      <span>خصم الشركة: {item.companyDiscount}</span>
      <span>
        {isEditMode && "تعديل "}إجمالي سعر الوحدات قبل حساب خصم الشركة:
        {item.finalPriceBeforeDiscount}
      </span>
      {isEditMode && (
        <FinalProductSectionCost item={item} orderIndex={orderIndex} />
      )}
    </div>
  );
};

const FinalProductSectionCost = ({ item, orderIndex }) => {
  const { invoiceId } = useParams();
  const { invoicesState, invoicesDispatch } = useContext(InvoicesStore);
  const invoiceItem = invoicesState[invoiceId];
  const [finalProductSectionCost, setFinalProductSectionCost] = useState("");

  const target = {
    finalProductSectionCost: [
      finalProductSectionCost,
      setFinalProductSectionCost,
    ],
  };

  const handleEditSection = () => {
    let targetOrderItem = invoiceItem.order[orderIndex];
    let newPriceOnRetailOrOld = {
      ...targetOrderItem.priceOnRetailOrOld,
      [item.companyDiscount]: {
        ...item,
        finalPriceBeforeDiscount: +finalProductSectionCost,
      },
    };
    targetOrderItem.priceOnRetailOrOld = newPriceOnRetailOrOld;

    let newOrder = invoiceItem.order;
    newOrder.splice(orderIndex, 1, targetOrderItem);

    invoicesDispatch(
      editInvoiceSection(invoiceItem, { key: "order", value: newOrder })
    );

    setFinalProductSectionCost("");
  };

  return (
    <div className="flex">
      <input
        autoComplete="off"
        dir="ltr"
        inputMode="numeric"
        type="text"
        name="finalProductSectionCost"
        id="finalProductSectionCost"
        className="text-center text-gray-800"
        value={finalProductSectionCost}
        onChange={(e) =>
          handleNumberInputChange(e, "finalProductSectionCost", target)
        }
      />
      <button
        className="px-3 bg-blue-500 justify-self-center rounded-md"
        onClick={() => handleEditSection()}>
        تعديل
      </button>
    </div>
  );
};

export default EditInvoice;

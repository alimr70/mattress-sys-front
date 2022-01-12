import { useContext } from "react";
import { useParams } from "react-router-dom";
import { InvoicesStore } from "../contexts/invoicesContext";
import { ProductsStore } from "../contexts/productsContext";
import { handleNumberInputChange } from "../utils";

const EditInvoice = ({ isEditMode }) => {
  const { invoiceId } = useParams();
  const { invoicesState } = useContext(InvoicesStore);

  const { productsState } = useContext(ProductsStore);

  const invoiceItem = invoicesState[invoiceId];
  console.log(invoiceItem);
  const handleEdit = () => {};
  return (
    <>
      <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
        <div className="col-span-1 justify-self-center text-2xl">
          تفاصيل الفاتورة
        </div>
        {isEditMode ? (
          <>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">القديم السعر: </span>
              <span className="justify-self-start">{}</span>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">تعديل السعر: </span>
              <input
                dir="ltr"
                inputMode="numeric"
                type="text"
                name="editPrice"
                id="editPrice"
                className="text-center text-gray-800"
                value={""}
                onChange={(e) =>
                  handleNumberInputChange(e, "price", "numberTarget")
                }
              />
            </div>
            <div className="col-span-1 grid">
              <button
                className="px-3 py-1 bg-blue-500 justify-self-center rounded-md"
                onClick={() => handleEdit()}>
                تعديل
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">رقم الفاتورة: </span>
              <span className="justify-self-start">{invoiceItem.id}</span>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">الاسم: </span>
              <span className="justify-self-start">
                {invoiceItem.cutomerName}
              </span>
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
              <span className="justify-self-start">
                {invoiceItem.invoiceDate}
              </span>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">تاريخ التسليم: </span>
              <span className="justify-self-start">
                {invoiceItem.receiptDate}
              </span>
            </div>
            <div className="col-span-1 border-2 border-gray-400">
              <span className="justify-self-end">الأوردر: </span>
              {invoiceItem.order.map((orderItem) => {
                return (
                  <>
                    <div className="m-2 flex flex-col border-2 border-gray-400">
                      <span>
                        المنتج: {productsState[orderItem.productId].name}
                      </span>
                      <span>الكمية: {orderItem.quantity}</span>
                      <span>خصم خاص بالمنتج: {orderItem.retailOffer}</span>
                      <span>سعر قديم: {orderItem.oldPrice.price}</span>
                      <span>
                        كمية السعر القديم: {orderItem.oldPrice.quantity}
                      </span>
                      <span>
                        إجمالي السعر للمنتج: {orderItem.totalQuantityPrice}
                      </span>
                    </div>
                  </>
                );
              })}
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
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">الإجمالي: </span>
              <span className="justify-self-start">
                {invoiceItem.totalInvoicePrice}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditInvoice;

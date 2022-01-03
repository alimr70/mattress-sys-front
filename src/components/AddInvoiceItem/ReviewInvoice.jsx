import { useContext } from "react";
import logo from "../../assets/taki-logo.png";
import { ProductsStore } from "../../contexts/productsContext";

const ReviewInvoice = ({
  cstName,
  address,
  phone,
  phoneTwo,
  invoiceDate,
  receiptDate,
  paymentMethod,
  order,
  shipmentOnCst,
  shipmentOnRetail,
  totalRetailOfferName,
  totalRetailOfferAmountPrecentage,
  totalRetailOfferAmountFixed,
}) => {
  const { productsState } = useContext(ProductsStore);

  console.log(order);
  return (
    <>
      <div className="w-full h-[70vh] bg-white text-black font-mono grid grid-cols-1 grid-rows-2 print:w-[21cm] print:h-[29.7cm] print:p-[0.25in] print:block">
        <div className="row-span-2 print:row-span-1 grid grid-rows-13 gap-1">
          {/* Logo */}
          <div className="row-span-1 mx-10">
            <img src={logo} alt="logo" className="max-w-full" />
          </div>

          {/* Cst info */}
          <div className="row-span-2">
            <div className="grid grid-cols-4 gap-1">
              <div className="justify-self-end">
                <span className="font-bold">التاريخ: </span>
              </div>
              <div className="justify-self-start">{invoiceDate}</div>
              <div className="justify-self-end">
                <span className="font-bold">تاريخ التسليم: </span>
              </div>
              <div className="justify-self-start">{receiptDate}</div>
            </div>

            <div className="grid grid-cols-4 gap-1">
              <div className="justify-self-end">
                <span className="font-bold">اسم العميل: </span>
              </div>
              <div className="justify-self-start">{cstName}</div>
              <div className="justify-self-end">
                <span className="font-bold">التليفون: </span>
              </div>
              <div className="justify-self-start">{phone}</div>
            </div>

            <div className="grid grid-cols-4 gap-1">
              <div className="justify-self-end">
                <span className="font-bold">عنوان العميل: </span>
              </div>
              <div className="justify-self-start">{address}</div>
              <div className="justify-self-end">
                <span className="font-bold">تليفون آخر: </span>
              </div>
              <div className="justify-self-start">{phoneTwo}</div>
            </div>
          </div>

          {/* divider */}
          <div></div>

          {/* Order info */}
          <div className="row-span-9">
            <table className="w-full border-2 border-black h-full">
              <th className="border-2 border-black">القيمة الإجمالية</th>
              <th className="border-2 border-black">سعر الوحدة</th>
              <th className="border-2 border-black">الكمية</th>
              <th className="border-2 border-black">اسم الصنف</th>

              <tbody className="border-2 border-black">
                {order.map((item) => {
                  const productDetails = productsState[item.productId];
                  return (
                    <tr className="divide-x-2 divide-x-reverse divide-black">
                      <td className="text-center">{item.totalQuantityPrice}</td>
                      <td className="text-center">{productDetails.price}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="pr-2">
                        {productDetails.type + " " + productDetails.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInvoice;

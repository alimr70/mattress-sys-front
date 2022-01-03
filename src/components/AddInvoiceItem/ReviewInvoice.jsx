import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
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

  const [totalBeforeRetailOffer, setTotalBeforeRetailOffer] = useState(0);
  const [totalAfterRetailOffer, setTotalAfterRetailOffer] = useState(0);

  useEffect(() => {
    // Clculate total price before retail offer
    let beforeOfferNum = 0;
    let afterOfferNum = 0;
    order.forEach((item) => {
      return (beforeOfferNum = beforeOfferNum + item.totalQuantityPrice);
    });

    if (totalRetailOfferAmountPrecentage !== "") {
      afterOfferNum =
        beforeOfferNum -
        (beforeOfferNum * +totalRetailOfferAmountPrecentage) / 100;
    } else if (totalRetailOfferAmountFixed !== "") {
      afterOfferNum = beforeOfferNum - +totalRetailOfferAmountFixed;
    } else {
      afterOfferNum = beforeOfferNum;
    }

    setTotalBeforeRetailOffer(beforeOfferNum);
    setTotalAfterRetailOffer(afterOfferNum);
  }, [
    order,
    setTotalBeforeRetailOffer,
    setTotalAfterRetailOffer,
    totalRetailOfferAmountPrecentage,
    totalRetailOfferAmountFixed,
  ]);

  const totalOfferName = totalRetailOfferAmountPrecentage
    ? totalRetailOfferName + " " + totalRetailOfferAmountPrecentage + "%"
    : totalRetailOfferName + " " + totalRetailOfferAmountFixed + "جم";

  const totalOfferValue = totalRetailOfferAmountPrecentage
    ? (totalBeforeRetailOffer * +totalRetailOfferAmountPrecentage) / 100
    : totalRetailOfferAmountFixed;

  const totalCost = totalAfterRetailOffer + +shipmentOnCst;
  return (
    <>
      <div className="w-full h-[70vh] bg-white text-black font-mono grid grid-cols-1 grid-rows-2 print:w-[21cm] print:h-[29.7cm] print:p-[0.25in] print:block">
        <div className="row-span-2 print:row-span-1 grid grid-rows-13 gap-1">
          {/* Logo */}
          <div className="row-span-1 mx-10">
            <img src={logo} alt="logo" className="w-1/3" />
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

          {/* Order info */}
          <div className="row-span-10">
            <table className="w-full border-2 border-black h-full print:h-[10cm]">
              <thead>
                <tr>
                  <th className="border-2 border-black">القيمة الإجمالية</th>
                  <th className="border-2 border-black">سعر الوحدة</th>
                  <th className="border-2 border-black">الكمية</th>
                  <th className="border-2 border-black">اسم الصنف</th>
                </tr>
              </thead>

              <tbody className="border-2 border-black h-[75%]">
                {order.map((item, index) => {
                  const productDetails = productsState[item.productId];
                  return (
                    <tr
                      className="divide-x-2 divide-x-reverse divide-black"
                      key={index}>
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
              <tbody className="border-2 border-black h-[25%]">
                <tr className="divide-x-2 divide-x-reverse divide-black">
                  <td className="text-center">{totalBeforeRetailOffer}</td>
                  <td className="pr-2">الإجمالى</td>
                  <td></td>
                  <td></td>
                </tr>

                {totalRetailOfferAmountPrecentage !== "" && (
                  <tr className="divide-x-2 divide-x-reverse divide-black">
                    <td className="text-center">{totalOfferValue + "-"}</td>
                    <td className="pr-2">{totalOfferName}</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}

                {totalRetailOfferAmountFixed !== "" && (
                  <tr className="divide-x-2 divide-x-reverse divide-black">
                    <td className="text-center">
                      {totalRetailOfferAmountFixed + "-"}
                    </td>
                    <td className="pr-2">{totalOfferName}</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}

                {shipmentOnCst !== "" && (
                  <tr className="divide-x-2 divide-x-reverse divide-black">
                    <td className="text-center">{shipmentOnCst}</td>
                    <td className="pr-2">نقل</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}

                <tr className="divide-x-2 divide-x-reverse divide-black">
                  <td className="text-center font-bold">{totalCost}</td>
                  <td className="pr-2 font-bold">صافي الفاتورة</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECOND INVOICE COPY */}
      </div>
    </>
  );
};

export default ReviewInvoice;

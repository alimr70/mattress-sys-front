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
      {/* grid grid-cols-1 grid-rows-2 */}
      <div className="w-full bg-white text-black font-mono flex flex-col print:w-[21cm] print:h-[29.7cm] print:px-[0.25in] print:py-[0.2in] print:block">
        {/* FIRST INVOICE COPY */}
        <div className="h-screen print:h-1/2">
          {/* Container */}
          <div className="h-[13cm] m-auto grid grid-rows-13 gap-1">
            {/* Logo */}
            <div className="row-span-1 mx-10">
              <img src={logo} alt="logo" className="w-[25%]" />
            </div>

            {/* Cst info */}
            <div className="row-span-2">
              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">التاريخ: </span>
                </div>
                <div className="justify-self-start col-span-2">
                  {invoiceDate}
                </div>
                <div className="justify-self-end">
                  <span className="font-bold">تاريخ التسليم: </span>
                </div>
                <div className="justify-self-start">{receiptDate}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">اسم العميل: </span>
                </div>
                <div className="justify-self-start col-span-2">{cstName}</div>
                <div className="justify-self-end">
                  <span className="font-bold">التليفون: </span>
                </div>
                <div className="justify-self-start">{phone}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">عنوان العميل: </span>
                </div>
                <div className="justify-self-start col-span-2">{address}</div>
                {phoneTwo !== "" && (
                  <>
                    <div className="justify-self-end">
                      <span className="font-bold">تليفون آخر: </span>
                    </div>
                    <div className="justify-self-start">{phoneTwo}</div>
                  </>
                )}
              </div>
            </div>

            {/* divider */}
            <div></div>

            {/* Order info */}
            <div className="row-span-10 h-[9.5cm] relative">
              {/* Cols dividers */}
              <div className="w-full h-[100%] flex absolute divide-x-4 divide-x-reverse divide-black">
                <div className="w-[45%] h-[100%] flex divide-x-4 divide-x-reverse divide-black">
                  <div className="w-[50%] h-[70%]"></div>
                  <div className="w-[30%] h-[100%]"></div>
                  <div className="w-[20%] h-[70%]"></div>
                </div>
                <div className="w-[55.4%] h-[70%] pr-3"></div>
              </div>

              <div className="w-full h-full border-2 border-black">
                <div className="flex">
                  <div className="w-[45%] flex text-center font-bold">
                    <div className="w-[50%] border-2 border-black">
                      القيمة الإجمالية
                    </div>
                    <div className="w-[30%] border-2 border-black">
                      سعر الوحدة
                    </div>
                    <div className="w-[20%] border-2 border-black">الكمية</div>
                  </div>
                  <div className="w-[55%] border-2 border-black text-center font-bold">
                    اســم الصـــنـــف
                  </div>
                </div>

                {/* divide-x-4 divide-x-reverse divide-black */}
                <div className="border-2 border-black h-[62.5%]">
                  {order.map((item, index) => {
                    const productDetails = productsState[item.productId];
                    return (
                      <div className="flex" key={index}>
                        <div className="w-[45%] flex">
                          <div className="w-[50%] text-center">
                            {item.totalQuantityPrice}
                          </div>
                          <div className="w-[30%] text-center">
                            {productDetails.price}
                          </div>
                          <div className="w-[20%] text-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="w-[55%] pr-3">
                          {productDetails.type + " " + productDetails.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals section */}
                <div className="border-2 border-black h-[29.5%]">
                  <div className="flex">
                    <div className="w-[45%] flex">
                      <div className="w-[50%] text-center">
                        {totalBeforeRetailOffer}
                      </div>
                      <div className="w-[30%] text-center">الإجمالى</div>
                      <div className="w-[20%] text-center"></div>
                    </div>
                  </div>

                  {totalRetailOfferAmountPrecentage !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {totalOfferValue + "-"}
                        </div>
                        <div className="w-[77.5%] pr-3">{totalOfferName}</div>
                      </div>
                    </div>
                  )}

                  {totalRetailOfferAmountFixed !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {totalRetailOfferAmountFixed + "-"}
                        </div>
                        <div className="w-[77.5%] pr-3">{totalOfferName}</div>
                      </div>
                    </div>
                  )}

                  {shipmentOnCst !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {shipmentOnCst}
                        </div>
                        <div className="w-[77.5%] pr-3">نقل</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex">
                    <div className="w-[100%] flex">
                      <div className="w-[22.5%] text-center font-bold">
                        {totalCost}
                      </div>
                      <div className="w-[77.5%] pr-3 text-right font-bold">
                        صافي الفاتورة
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "hidden mt-3 print:block print:h-1/2" */}
        {/* SECOND INVOICE COPY */}
        <div className="hidden print:block print:h-1/2">
          {/* Container */}
          <div className="h-[13cm] m-auto grid grid-rows-13 gap-1">
            {/* Logo */}
            <div className="row-span-1 mx-10">
              <img src={logo} alt="logo" className="w-[25%]" />
            </div>

            {/* Cst info */}
            <div className="row-span-2">
              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">التاريخ: </span>
                </div>
                <div className="justify-self-start col-span-2">
                  {invoiceDate}
                </div>
                <div className="justify-self-end">
                  <span className="font-bold">تاريخ التسليم: </span>
                </div>
                <div className="justify-self-start">{receiptDate}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">اسم العميل: </span>
                </div>
                <div className="justify-self-start col-span-2">{cstName}</div>
                <div className="justify-self-end">
                  <span className="font-bold">التليفون: </span>
                </div>
                <div className="justify-self-start">{phone}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">عنوان العميل: </span>
                </div>
                <div className="justify-self-start col-span-2">{address}</div>
                {phoneTwo !== "" && (
                  <>
                    <div className="justify-self-end">
                      <span className="font-bold">تليفون آخر: </span>
                    </div>
                    <div className="justify-self-start">{phoneTwo}</div>
                  </>
                )}
              </div>
            </div>

            {/* divider */}
            <div></div>

            {/* Order info */}
            <div className="row-span-10 h-[9.5cm] relative">
              {/* Cols dividers */}
              <div className="w-full h-[100%] flex absolute divide-x-4 divide-x-reverse divide-black">
                <div className="w-[45%] h-[100%] flex divide-x-4 divide-x-reverse divide-black">
                  <div className="w-[50%] h-[70%]"></div>
                  <div className="w-[30%] h-[100%]"></div>
                  <div className="w-[20%] h-[70%]"></div>
                </div>
                <div className="w-[55.4%] h-[70%] pr-3"></div>
              </div>

              <div className="w-full h-full border-2 border-black">
                <div className="flex">
                  <div className="w-[45%] flex text-center font-bold">
                    <div className="w-[50%] border-2 border-black">
                      القيمة الإجمالية
                    </div>
                    <div className="w-[30%] border-2 border-black">
                      سعر الوحدة
                    </div>
                    <div className="w-[20%] border-2 border-black">الكمية</div>
                  </div>
                  <div className="w-[55%] border-2 border-black text-center font-bold">
                    اســم الصـــنـــف
                  </div>
                </div>

                {/* divide-x-4 divide-x-reverse divide-black */}
                <div className="border-2 border-black h-[62.5%]">
                  {order.map((item, index) => {
                    const productDetails = productsState[item.productId];
                    return (
                      <div className="flex" key={index}>
                        <div className="w-[45%] flex">
                          <div className="w-[50%] text-center">
                            {item.totalQuantityPrice}
                          </div>
                          <div className="w-[30%] text-center">
                            {productDetails.price}
                          </div>
                          <div className="w-[20%] text-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="w-[55%] pr-3">
                          {productDetails.type + " " + productDetails.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals section */}
                <div className="border-2 border-black h-[29.5%]">
                  <div className="flex">
                    <div className="w-[45%] flex">
                      <div className="w-[50%] text-center">
                        {totalBeforeRetailOffer}
                      </div>
                      <div className="w-[30%] text-center">الإجمالى</div>
                      <div className="w-[20%] text-center"></div>
                    </div>
                  </div>

                  {totalRetailOfferAmountPrecentage !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {totalOfferValue + "-"}
                        </div>
                        <div className="w-[77.5%] pr-3">{totalOfferName}</div>
                      </div>
                    </div>
                  )}

                  {totalRetailOfferAmountFixed !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {totalRetailOfferAmountFixed + "-"}
                        </div>
                        <div className="w-[77.5%] pr-3">{totalOfferName}</div>
                      </div>
                    </div>
                  )}

                  {shipmentOnCst !== "" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {shipmentOnCst}
                        </div>
                        <div className="w-[77.5%] pr-3">نقل</div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex">
                    <div className="w-[100%] flex">
                      <div className="w-[22.5%] text-center font-bold">
                        {totalCost}
                      </div>
                      <div className="w-[77.5%] pr-3 text-right font-bold">
                        صافي الفاتورة
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInvoice;

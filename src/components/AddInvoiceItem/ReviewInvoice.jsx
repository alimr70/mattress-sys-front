import { useContext, useEffect, useState } from "react";
import logo from "../../assets/taki-logo.png";
import { GeneralTypesStore } from "../../contexts/generalTypesContext";
import { ProductsStore } from "../../contexts/productsContext";
import { generateSerialNumber } from "../../utils";

const ReviewInvoice = ({
  serialNum,
  setSerialNum,
  cstName,
  address,
  phone,
  phoneTwo,
  invoiceDate,
  receiptDate,
  order,
  shipmentOnCst,
  shipmentOnRetail,
  totalRetailOfferName,
  totalRetailOfferAmountPrecentage,
  totalRetailOfferAmountFixed,
  totalInvoicePrice,
  setTotalInvoicePrice,
  paidMoney,
  remainingMoney,
  setRemainingMoney,
  isShipment,
}) => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { serialNumbers } = generalTypesState;
  const { invoicesSerials } = serialNumbers;

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
        Math.ceil((beforeOfferNum * +totalRetailOfferAmountPrecentage) / 100);
    } else if (totalRetailOfferAmountFixed !== "") {
      afterOfferNum = beforeOfferNum - +totalRetailOfferAmountFixed;
    } else {
      afterOfferNum = beforeOfferNum;
    }

    setTotalBeforeRetailOffer(beforeOfferNum);
    setTotalAfterRetailOffer(afterOfferNum);
    setTotalInvoicePrice(totalAfterRetailOffer + +shipmentOnCst);
    setSerialNum(
      generateSerialNumber(
        `${+invoicesSerials[invoicesSerials.length - 1] + 1}`
      )
    );
    setRemainingMoney(paidMoney !== "" ? totalInvoicePrice - +paidMoney : "");
  }, [
    order,
    setTotalBeforeRetailOffer,
    setTotalAfterRetailOffer,
    totalRetailOfferAmountPrecentage,
    totalRetailOfferAmountFixed,
    invoicesSerials,
    setSerialNum,
    totalInvoicePrice,
    setTotalInvoicePrice,
    shipmentOnCst,
    totalAfterRetailOffer,
    paidMoney,
    setRemainingMoney,
  ]);

  const totalOfferName = totalRetailOfferAmountPrecentage
    ? totalRetailOfferName + " " + totalRetailOfferAmountPrecentage + "%"
    : totalRetailOfferName + " " + totalRetailOfferAmountFixed + "????";

  const totalOfferValue = totalRetailOfferAmountPrecentage
    ? Math.ceil(
        (totalBeforeRetailOffer * +totalRetailOfferAmountPrecentage) / 100
      )
    : totalRetailOfferAmountFixed;

  const totalCost = totalAfterRetailOffer + +shipmentOnCst;

  const date = new Date();
  const yearSerial = `${date.getFullYear()}${
    date.getMonth() + 1
  }${date.getDate()}`;

  return (
    <>
      {/* grid grid-cols-1 grid-rows-2 */}
      <div className="w-full bg-white text-black font-mono flex flex-col mb-10 print:mb-0 print:w-[21cm] print:h-[29.7cm] print:px-[0.25in] print:py-[0.2in] print:block">
        {/* FIRST INVOICE COPY */}
        <div className="h-[78vh] print:h-1/2 relative">
          {/* Container */}
          <div className="h-[13cm] m-auto grid grid-rows-13 gap-1">
            {/* Logo */}
            <div className="row-span-1 mx-10 grid grid-cols-2">
              <img src={logo} alt="logo" className="w-[50%]" />
              <p className="justify-self-end self-center">
                ?????? ????????????????: {yearSerial + serialNum}
              </p>
            </div>

            {/* Cst info */}
            <div className="row-span-2">
              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ????????????????: </span>
                </div>
                <div className="justify-self-start col-span-2">
                  {invoiceDate}
                </div>
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ??????????????: </span>
                </div>
                <div className="justify-self-start">{receiptDate}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ????????????????: </span>
                </div>
                <div className="justify-self-start col-span-2">{cstName}</div>
                <div className="justify-self-end">
                  <span className="font-bold">????????????????: </span>
                </div>
                <div className="justify-self-start">{phone}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ????????????????: </span>
                </div>
                <div className="justify-self-start col-span-2 text-xs font-bold">
                  {address}
                </div>
                {phoneTwo !== "" && (
                  <>
                    <div className="justify-self-end">
                      <span className="font-bold">???????????? ??????: </span>
                    </div>
                    <div className="justify-self-start">{phoneTwo}</div>
                  </>
                )}
              </div>
            </div>

            {/* divider */}
            <div></div>

            {/* Order info */}
            <div className="row-span-9 h-[9cm] relative">
              {/* Cols dividers */}
              <div className="w-full h-[100%] flex absolute divide-x-4 divide-x-reverse divide-black">
                <div className="w-[45%] h-[100%] flex divide-x-4 divide-x-reverse divide-black">
                  <div className="w-[50%] h-[64%]"></div>
                  <div className="w-[30%] h-[100%]"></div>
                  <div className="w-[20%] h-[64%]"></div>
                </div>
                <div className="w-[55.4%] h-[64%] pr-3"></div>
              </div>

              <div className="w-full h-full border-2 border-black">
                <div className="flex">
                  <div className="w-[45%] flex text-center font-bold">
                    <div className="w-[50%] border-2 border-black">
                      ???????????? ??????????????????
                    </div>
                    <div className="w-[30%] border-2 border-black">
                      ?????? ????????????
                    </div>
                    <div className="w-[20%] border-2 border-black">????????????</div>
                  </div>
                  <div className="w-[55%] border-2 border-black text-center font-bold">
                    ?????????? ??????????????????????
                  </div>
                </div>

                {/* divide-x-4 divide-x-reverse divide-black */}
                <div className="border-2 border-black h-[56%]">
                  {order.map((item, index) => {
                    const productDetails = productsState[item.productId];
                    return (
                      <div className="flex" key={index}>
                        <div className="w-[45%] flex">
                          <div className="w-[50%] text-center">
                            {item.totalQuantityPrice}
                          </div>
                          <div className="w-[30%] text-center">
                            {
                              productDetails.priceHistory[
                                productDetails.priceHistory.length - 1
                              ].price
                            }
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
                <div className="border-2 border-black h-[36%]">
                  <div className="flex">
                    <div className="w-[100%] flex">
                      <div className="w-[22.5%] text-center">
                        {totalBeforeRetailOffer}
                      </div>
                      <div className="w-[77.5%] pr-3">????????????????</div>
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

                  {shipmentOnCst !== "" && shipmentOnCst !== "0" && (
                    <div className="flex">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center">
                          {shipmentOnCst}
                        </div>
                        <div className="w-[77.5%] pr-3">??????</div>
                      </div>
                    </div>
                  )}

                  {isShipment &&
                    (shipmentOnCst === "0" ||
                      shipmentOnCst === "" ||
                      shipmentOnCst === 0) &&
                    (shipmentOnRetail !== "" || shipmentOnRetail !== 0) && (
                      <div className="flex">
                        <div className="w-[100%] flex">
                          <div className="w-[22.5%] text-center">
                            {shipmentOnCst}
                          </div>
                          <div className="w-[77.5%] pr-3">?????????? ??????????</div>
                        </div>
                      </div>
                    )}

                  <div className="flex bottom-0">
                    <div className="w-[100%] flex">
                      <div className="w-[22.5%] text-center font-bold">
                        {totalCost}
                      </div>
                      <div className="w-[77.5%] pr-3 text-right font-bold">
                        ???????? ????????????????
                      </div>
                    </div>
                  </div>

                  {paidMoney !== "" && paidMoney !== 0 && paidMoney !== "0" && (
                    <div className="flex bottom-0">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center font-bold">
                          {remainingMoney}
                        </div>
                        <div className="w-[77.5%] pr-3 text-right font-bold">
                          ??????????????
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-1 font-bold text-xs flex flex-col items-center">
            <p>
              119 ???????????? ?????? ???????? ???????????? ?????? ???????????? ???????? ?????????????? ???????????? -
              ??????????????
            </p>
            <p>01003434685 - 01227297834 - 01101223012</p>
          </div>
        </div>

        {/* "hidden mt-3 print:block print:h-1/2" */}
        {/* SECOND INVOICE COPY */}
        <div className="hidden mt-5 print:block print:h-1/2">
          {/* Container */}
          <div className="h-[13cm] m-auto grid grid-rows-13 gap-1">
            {/* Logo */}
            <div className="row-span-1 mx-10 grid grid-cols-2">
              <img src={logo} alt="logo" className="w-[50%]" />
              <p className="justify-self-end self-center">
                ?????? ????????????????: {serialNum}
              </p>
            </div>

            {/* Cst info */}
            <div className="row-span-2">
              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">??????????????: </span>
                </div>
                <div className="justify-self-start col-span-2">
                  {invoiceDate}
                </div>
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ??????????????: </span>
                </div>
                <div className="justify-self-start">{receiptDate}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">?????? ????????????: </span>
                </div>
                <div className="justify-self-start col-span-2">{cstName}</div>
                <div className="justify-self-end">
                  <span className="font-bold">????????????????: </span>
                </div>
                <div className="justify-self-start">{phone}</div>
              </div>

              <div className="grid grid-cols-5 gap-1">
                <div className="justify-self-end">
                  <span className="font-bold">?????????? ????????????: </span>
                </div>
                <div className="justify-self-start col-span-2">{address}</div>
                {phoneTwo !== "" && (
                  <>
                    <div className="justify-self-end">
                      <span className="font-bold">???????????? ??????: </span>
                    </div>
                    <div className="justify-self-start">{phoneTwo}</div>
                  </>
                )}
              </div>
            </div>

            {/* divider */}
            <div></div>

            {/* Order info */}
            <div className="row-span-9 h-[9cm] relative">
              {/* Cols dividers */}
              <div className="w-full h-[100%] flex absolute divide-x-4 divide-x-reverse divide-black">
                <div className="w-[45%] h-[100%] flex divide-x-4 divide-x-reverse divide-black">
                  <div className="w-[50%] h-[64%]"></div>
                  <div className="w-[30%] h-[100%]"></div>
                  <div className="w-[20%] h-[64%]"></div>
                </div>
                <div className="w-[55.4%] h-[64%] pr-3"></div>
              </div>

              <div className="w-full h-full border-2 border-black">
                <div className="flex">
                  <div className="w-[45%] flex text-center font-bold">
                    <div className="w-[50%] border-2 border-black">
                      ???????????? ??????????????????
                    </div>
                    <div className="w-[30%] border-2 border-black">
                      ?????? ????????????
                    </div>
                    <div className="w-[20%] border-2 border-black">????????????</div>
                  </div>
                  <div className="w-[55%] border-2 border-black text-center font-bold">
                    ?????????? ??????????????????????
                  </div>
                </div>

                {/* divide-x-4 divide-x-reverse divide-black */}
                <div className="border-2 border-black h-[56%]">
                  {order.map((item, index) => {
                    const productDetails = productsState[item.productId];
                    return (
                      <div className="flex" key={index}>
                        <div className="w-[45%] flex">
                          <div className="w-[50%] text-center">
                            {item.totalQuantityPrice}
                          </div>
                          <div className="w-[30%] text-center">
                            {
                              productDetails.priceHistory[
                                productDetails.priceHistory.length - 1
                              ].price
                            }
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
                <div className="border-2 border-black h-[36%]">
                  <div className="flex">
                    <div className="w-[45%] flex">
                      <div className="w-[50%] text-center">
                        {totalBeforeRetailOffer}
                      </div>
                      <div className="w-[30%] text-center">????????????????</div>
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
                        <div className="w-[77.5%] pr-3">??????</div>
                      </div>
                    </div>
                  )}

                  {isShipment &&
                    (shipmentOnCst === "0" ||
                      shipmentOnCst === "" ||
                      shipmentOnCst === 0) &&
                    (shipmentOnRetail !== "" || shipmentOnRetail !== 0) && (
                      <div className="flex">
                        <div className="w-[100%] flex">
                          <div className="w-[22.5%] text-center">
                            {shipmentOnCst}
                          </div>
                          <div className="w-[77.5%] pr-3">?????????? ??????????</div>
                        </div>
                      </div>
                    )}

                  <div className="mt-auto flex">
                    <div className="w-[100%] flex">
                      <div className="w-[22.5%] text-center font-bold">
                        {totalCost}
                      </div>
                      <div className="w-[77.5%] pr-3 text-right font-bold">
                        ???????? ????????????????
                      </div>
                    </div>
                  </div>

                  {(remainingMoney !== "" ||
                    remainingMoney !== 0 ||
                    remainingMoney !== "0") && (
                    <div className="flex bottom-0">
                      <div className="w-[100%] flex">
                        <div className="w-[22.5%] text-center font-bold">
                          {remainingMoney}
                        </div>
                        <div className="w-[77.5%] pr-3 text-right font-bold">
                          ??????????????
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full mt-16 pt-4 font-bold text-xs flex flex-col items-center">
              <p>???????? ??????????</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInvoice;

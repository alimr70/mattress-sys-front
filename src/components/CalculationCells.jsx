import { useContext, useState } from "react";
import { InvoicesStore } from "../contexts/invoicesContext";
import { ProductsStore } from "../contexts/productsContext";
import { getTotalOrdersArr } from "../utils";

const CalculationCells = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2)
      .toISOString()
      .split("T")[0]
  );

  return (
    <div className='w-full max-w-3xl mx-auto grid grid-cols-1'>
      <DateFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <CalcutalteNumbers startDate={startDate} endDate={endDate} />
    </div>
  );
};

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className='m-5 col-span-full grid xs:grid-cols-2 gap-2'>
      <div className='col-span-1 flex xs:justify-self-end'>
        <label htmlFor='startDate'>تاريخ البدء:</label>
        <input
          type='date'
          name='startDate'
          id='startDate'
          className='text-center text-gray-800'
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
      </div>
      <div className='col-span-1 flex'>
        <label htmlFor='endDate'>تاريخ الانتهاء:</label>
        <input
          type='date'
          name='endDate'
          id='endDate'
          className='text-center text-gray-800'
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

const CalcutalteNumbers = ({ startDate, endDate }) => {
  const [expenses, setExpenses] = useState(30000);
  const { invoicesState } = useContext(InvoicesStore);

  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;

  let startDateTime = new Date(startDate).getTime() + userTimezoneOffset;
  // let invoiceDateTime = new Date(invoice.invoiceDate).getTime();
  let endDateTime = new Date(endDate).getTime() + userTimezoneOffset;

  const timeFilteredInvoices = Object.values(invoicesState).filter(
    (invoice) =>
      invoice.status !== "deleted" &&
      startDateTime <= new Date(invoice.invoiceDate).getTime() &&
      new Date(invoice.invoiceDate).getTime() <= endDateTime
  );
  let totalSales = 0;
  let totalIncome = 0;
  timeFilteredInvoices.forEach((el) => {
    let totalItemSalesNum =
      el.totalInvoicePrice -
      (el.paymentMethod.cardAmount > 0
        ? el.paymentMethod.cardAmount * 0.02
        : 0) -
      (el.shipmentCharge.shipmentOnRetail + el.shipmentCharge.shipmentOnCst);
    totalSales += totalItemSalesNum;

    // el.order?.forEach((item) => {
    //   totalSales += item.totalQuantityPrice;
    // });
    totalIncome += el.totalProfit;
  });
  return (
    <>
      <div className='col-span-full'>
        <label htmlFor='expenses'>أدخل إجمالي المصاريف</label>
        <input
          className='text-gray-800'
          name='expenses'
          type='number'
          value={expenses}
          onChange={(e) => {
            setExpenses(e.target.value);
          }}
        />
      </div>
      <div className='col-span-1 grid grid-cols-1 xs:grid-cols-3'>
        <NumberCellAndTitle title={"المبيعات"} number={totalSales} />
        <NumberCellAndTitle title={"الإيرادات"} number={totalIncome} />
        <NumberCellAndTitle
          title={"صافي الأرباح"}
          number={totalIncome - expenses}
        />
      </div>
      <div className='col-span-1'>
        <SoldInventoryDetails timeFilteredInvoices={timeFilteredInvoices} />
      </div>
    </>
  );
};

const NumberCellAndTitle = ({ title, number }) => {
  return (
    <div className='m-2 p-3 col-span-1 grid bg-gray-700 rounded-md'>
      <h3 className='text-lg font-bold text-blue-500 justify-self-center'>
        {title}
      </h3>
      <h1 className='text-2xl justify-self-center'>{Math.ceil(number)}</h1>
    </div>
  );
};

// جرد الأصناف المباعة ومقاساتها بالترتيب
const SoldInventoryDetails = ({ timeFilteredInvoices }) => {
  const { productsState } = useContext(ProductsStore);
  const { totalSoldMattress, arrangedAvailableDimentions } = getTotalOrdersArr(
    timeFilteredInvoices,
    productsState
  );

  const MattressTypes = ["R", "G", "D", "Sue", "M15", "M20", "M25", "Me22"];
  const MattressTypesAr = [
    "ريترو 20",
    "جولدن 26",
    "دودو 30",
    "سو 25",
    "ماريو 15",
    "ماريو 20",
    "ماريو 25",
    "ميموري 35",
  ];

  const QuantityCell = ({ targetDimentionItems, title, thickness }) => {
    return (
      <span className='w-full text-center border-2 border-gray-600 p-1 col-span-1'>
        {
          targetDimentionItems.filter(
            (item) => item.name.includes(title) && item.thickness === thickness
          )[0]?.quantity
        }
      </span>
    );
  };

  return (
    <>
      {/* Dimentions */}
      <div className='w-full overflow-auto'>
        <div className='m-2 grid grid-cols-1 w-[760px] max-w-3xl overflow-auto'>
          <div className='col-span-1 grid grid-cols-10'>
            <span className='p-1 col-span-2 justify-self-center'>المقاسات</span>
            {MattressTypes.map((type, index) => (
              <span key={index} className='p-1 col-span-1 justify-self-center'>
                {type}
              </span>
            ))}
          </div>
          {arrangedAvailableDimentions.map((dimention, index) => {
            const targetDimentionItems = totalSoldMattress.filter((item) => {
              return item.name.includes(dimention);
            });
            return (
              <div key={index} className='col-span-1 grid grid-cols-10'>
                <span className='w-full text-center border-2 border-gray-600 p-1 col-span-2'>
                  {dimention}
                </span>
                {MattressTypesAr.map((type, index) => {
                  let typeDetails = type.split(" ");
                  return (
                    <QuantityCell
                      key={index}
                      targetDimentionItems={targetDimentionItems}
                      title={typeDetails[0]}
                      thickness={typeDetails[1]}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CalculationCells;

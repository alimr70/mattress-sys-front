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
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 xs:grid-cols-3">
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
    <div className="m-5 col-span-full grid xs:grid-cols-2 gap-2">
      <div className="col-span-1 flex xs:justify-self-end">
        <label htmlFor="startDate">تاريخ البدء:</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          className="text-center text-gray-800"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
      </div>
      <div className="col-span-1 flex">
        <label htmlFor="endDate">تاريخ الانتهاء:</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          className="text-center text-gray-800"
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
  const { productsState } = useContext(ProductsStore);
  const { invoicesState } = useContext(InvoicesStore);

  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timeFilteredInvoices = Object.values(invoicesState).filter(
    (invoice) =>
      new Date(startDate).getTime() + userTimezoneOffset < invoice.time &&
      new Date(invoice.invoiceDate).getTime() <
        new Date(endDate).getTime() + userTimezoneOffset
  );
  let totalSales = 0;
  let totalIncome = 0;
  timeFilteredInvoices.forEach((el) => {
    totalSales += el.totalPriceOnRetail;
    totalIncome += el.totalProfit;
  });
  console.log(getTotalOrdersArr(timeFilteredInvoices, productsState));
  return (
    <>
      <div className="col-span-full">
        <label htmlFor="expenses">أدخل إجمالي المصاريف</label>
        <input
          className="text-gray-800"
          name="expenses"
          type="number"
          value={expenses}
          onChange={(e) => {
            setExpenses(e.target.value);
          }}
        />
      </div>
      <NumberCellAndTitle title={"المبيعات"} number={totalSales} />
      <NumberCellAndTitle title={"الإيرادات"} number={totalIncome} />
      <NumberCellAndTitle
        title={"صافي الأرباح"}
        number={totalIncome - expenses}
      />
    </>
  );
};

const NumberCellAndTitle = ({ title, number }) => {
  return (
    <div className="m-2 p-3 col-span-1 grid bg-gray-700 rounded-md">
      <h3 className="text-lg font-bold text-blue-500 justify-self-center">
        {title}
      </h3>
      <h1 className="text-2xl justify-self-center">{Math.floor(number)}</h1>
    </div>
  );
};

// جرد الأصناف المباعة ومقاساتها بالترتيب
// const SoldInventoryDetails = () => {
//   const { invoicesState } = useContext(InvoicesStore);

//   return <></>;
// };

export default CalculationCells;

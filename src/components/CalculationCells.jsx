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
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1">
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
      <div className="col-span-1 grid grid-cols-1 xs:grid-cols-3">
        <NumberCellAndTitle title={"المبيعات"} number={totalSales} />
        <NumberCellAndTitle title={"الإيرادات"} number={totalIncome} />
        <NumberCellAndTitle
          title={"صافي الأرباح"}
          number={totalIncome - expenses}
        />
      </div>
      <div className="col-span-1">
        <SoldInventoryDetails timeFilteredInvoices={timeFilteredInvoices} />
      </div>
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
const SoldInventoryDetails = ({ timeFilteredInvoices }) => {
  const { productsState } = useContext(ProductsStore);
  const { totalSoldMattress, arrangedAvailableDimentions } = getTotalOrdersArr(
    timeFilteredInvoices,
    productsState
  );
  // console.log({ totalSoldMattress, arrangedAvailableDimentions });

  return (
    <>
      {/* Dimentions */}
      <div className="w-full overflow-auto">
        <div className="m-2 grid grid-cols-1 w-[760px] max-w-3xl overflow-auto">
          <div className="col-span-1 grid grid-cols-10">
            <span className="p-1 col-span-2 justify-self-center">المقاسات</span>
            <span className="p-1 col-span-1 justify-self-center">R</span>
            <span className="p-1 col-span-1 justify-self-center">G</span>
            <span className="p-1 col-span-1 justify-self-center">D</span>
            <span className="p-1 col-span-1 justify-self-center">Sue</span>
            <span className="p-1 col-span-1 justify-self-center">M15</span>
            <span className="p-1 col-span-1 justify-self-center">M20</span>
            <span className="p-1 col-span-1 justify-self-center">M25</span>
            <span className="p-1 col-span-1 justify-self-center">Me22</span>
          </div>
          {arrangedAvailableDimentions.map((dimention, index) => {
            const targetDimentionItems = totalSoldMattress.filter((item) => {
              return item.name.includes(dimention);
            });
            return (
              <div key={index} className="col-span-1 grid grid-cols-10">
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-2">
                  {dimention}
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter((item) =>
                      item.name.includes("ريترو")
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter((item) =>
                      item.name.includes("جولدن")
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter((item) =>
                      item.name.includes("دودو")
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter((item) =>
                      item.name.includes("سو")
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter(
                      (item) =>
                        item.name.includes("ماريو") && item.thickness === "15"
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter(
                      (item) =>
                        item.name.includes("ماريو") && item.thickness === "20"
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter(
                      (item) =>
                        item.name.includes("ماريو") && item.thickness === "25"
                    )[0]?.quantity
                  }
                </span>
                <span className="w-full text-center border-2 border-gray-600 p-1 col-span-1">
                  {
                    targetDimentionItems.filter((item) =>
                      item.name.includes("ميموري22")
                    )[0]?.quantity
                  }
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CalculationCells;

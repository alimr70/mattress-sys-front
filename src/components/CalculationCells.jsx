import { useContext, useState } from "react";
import { InvoicesStore } from "../contexts/invoicesContext";

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
    <div className="w-full grid grid-cols-3">
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
    <div className="m-5 col-span-3 grid xs:grid-cols-2 gap-2">
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
  const { invoicesState } = useContext(InvoicesStore);

  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const filtered = Object.values(invoicesState).filter(
    (invoice) =>
      new Date(startDate).getTime() + userTimezoneOffset < invoice.time &&
      invoice.time < new Date(endDate).getTime() + userTimezoneOffset
  );
  console.log(filtered);
  return <></>;
};

const NumberCellAndTitle = () => {
  return (
    <div>
      <h3 className="font-lg font-bold text-blue-500">المبيعات</h3>
      <h1 className="font-2xl">150669</h1>
    </div>
  );
};

export default CalculationCells;

import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import WarehouseItem from "../components/WarehouseItem";
import { WarehouseStore } from "../contexts/warehouseContext";

const Warehouse = () => {
  const { warehouseState } = useContext(WarehouseStore);
  return (
    <>
      <Header />
      <div className="p-5 flex flex-row-reverse">
        <Link to="/addtowarehouse" className="px-5 py-2 bg-blue-500">
          <button>إضافة مخزون</button>
        </Link>
      </div>
      <Container title="المخزن">
        <div>
          <ul className="flex justify-end flex-col">
            {Object.values(warehouseState).map((item) => {
              return <WarehouseItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Warehouse;

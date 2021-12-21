import { useContext } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import WarehouseItem from "../components/WarehouseItem";
import { WarehouseStore } from "../contexts/warehouseContext";

const Warehouse = () => {
  const { warehouseState } = useContext(WarehouseStore);
  console.log(warehouseState);
  return (
    <>
      <Header />
      <Container title="المخزن">
        <div>
          <ul className="flex justify-end flex-col">
            {warehouseState.map((item) => {
              return <WarehouseItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Warehouse;

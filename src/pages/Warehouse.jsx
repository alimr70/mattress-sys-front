import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { ProductsStore } from "../contexts/productsContext";
// import { WarehouseStore } from "../contexts/warehouseContext";
// import WarehouseItem from "../components/WarehouseItem";

const Warehouse = () => {
  // const { warehouseState } = useContext(WarehouseStore);
  // const warehouseItems = Object.values(warehouseState);

  const { productsState } = useContext(ProductsStore);
  const products = Object.values(productsState);

  return (
    <>
      <Header />
      <div className="p-5 flex flex-row">
        <Link to="/addtowarehouse" className="px-5 py-2 bg-blue-500">
          <button>إضافة مخزون</button>
        </Link>
      </div>
      <Container title="المخزن">
        <Filter toBeFilteredProductsArr={products} />
        {/* <div>
          <ul className="flex justify-end flex-col">
            {Object.values(warehouseState).map((item) => {
              return <WarehouseItem key={item.id} item={item} />;
            })}
          </ul>
        </div> */}
      </Container>
    </>
  );
};

export default Warehouse;

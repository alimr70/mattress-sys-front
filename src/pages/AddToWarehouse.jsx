import AddWarehouseItem from "../components/AddWarehouseItem";
import Container from "../components/Container";
import Header from "../components/Header";

const AddToWarehouse = () => {
  return (
    <>
      <Header />
      <Container title={"إضافة مخزون"}>
        <AddWarehouseItem />
      </Container>
    </>
  );
};

export default AddToWarehouse;

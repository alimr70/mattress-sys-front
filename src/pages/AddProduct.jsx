import AddProductItem from "../components/AddProductItem";
import Container from "../components/Container";
import Header from "../components/Header";

const AddProducts = () => {
  return (
    <>
      <Header />
      <Container title={"إضافة منتج"}>
        <AddProductItem />
      </Container>
    </>
  );
};

export default AddProducts;

import AddInvoiceItem from "../components/AddInvoiceItem";
import Container from "../components/Container";
import Header from "../components/Header";

const AddInvoice = () => {
  return (
    <>
      <Header />
      <Container title={"إنشاء فاتورة"}>
        <AddInvoiceItem />
      </Container>
    </>
  );
};

export default AddInvoice;

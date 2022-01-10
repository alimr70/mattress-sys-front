import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { InvoicesStore } from "../contexts/invoicesContext";

const Invoices = () => {
  const { invoicesState } = useContext(InvoicesStore);
  const invoices = Object.values(invoicesState);
  return (
    <>
      <Header />
      <div className="p-5 flex flex-row">
        <Link to="/addinvoice" className="px-5 py-2 bg-blue-500">
          <button>إنشاء فاتورة</button>
        </Link>
      </div>
      <Container title="الفواتير">
        <Filter toBeFilteredProductsArr={invoices} />
        {/* <div>
          <ul className="flex justify-end flex-col">
            {invoices.map((item) => {
              return <InvoiceItem key={item.id} item={item} />;
            })}
          </ul>
        </div> */}
      </Container>
    </>
  );
};

export default Invoices;

import Container from "../components/Container";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
const Warehouse = () => {
  return (
    <>
      <Header />
      <Container title="المخزن">
        <div>
          <ul className="flex justify-end flex-col">
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              quantity="3"
              price="1506"
              companyDiscount="0.25"
            />
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              quantity="1"
              price="1506"
              companyDiscount="0.3"
            />
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              quantity="5"
              price="1506"
              companyDiscount="0.25"
            />
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Warehouse;

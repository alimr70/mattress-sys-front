import Container from "../components/Container";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
const Products = () => {
  return (
    <>
      <Header />
      <Container title="المنتجات">
        <div>
          <ul className="flex justify-end flex-col">
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              price="1506"
            />
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              price="1506"
            />
            <ProductItem
              productType="مرتبة"
              name="ريترو"
              category="متصلة"
              thickness="20"
              width="80"
              height="195"
              price="1506"
            />
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Products;

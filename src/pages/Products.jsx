import { useContext } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
import { ProductsStore } from "../contexts/productsContext";

const Products = () => {
  const { productsState } = useContext(ProductsStore);
  const products = Object.values(productsState);
  return (
    <>
      <Header />
      <Container title="المنتجات">
        <div>
          <ul className="flex justify-end flex-col">
            {products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Products;

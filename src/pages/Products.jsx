import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { ProductsStore } from "../contexts/productsContext";

const Products = () => {
  const { productsState } = useContext(ProductsStore);
  const products = Object.values(productsState);

  return (
    <>
      <Header />
      <div className='p-5 flex flex-row'>
        <Link to='/addproduct' className='px-5 py-2 bg-blue-500'>
          <button>إضافة منتج</button>
        </Link>
        <Link to='/custom' className='mr-2 px-5 py-2 bg-blue-500'>
          <button>إضافة مقاس خاص</button>
        </Link>
      </div>
      <Container title='المنتجات'>
        <Filter toBeFilteredProductsArr={products} />
        {/* <div>
          <ul className="flex justify-end flex-col">
            {products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </ul>
        </div> */}
      </Container>
    </>
  );
};

export default Products;

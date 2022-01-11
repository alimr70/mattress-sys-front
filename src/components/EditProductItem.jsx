import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsStore } from "../contexts/productsContext";

const EditProductItem = () => {
  const { productId } = useParams();

  const { productsState } = useContext(ProductsStore);

  console.log(productsState[productId]);
  return (
    <>
      <div>تفاصيل المنتج</div>
    </>
  );
};

export default EditProductItem;

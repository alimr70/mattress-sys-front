import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsStore } from "../contexts/productsContext";
import { addProduct } from "../contexts/productsContext/productsActions";
import { handleNumberInputChange } from "../utils";

const EditProductItem = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { productsState, productsDispatch } = useContext(ProductsStore);
  const product = productsState[productId];
  const [price, setPrice] = useState("");
  const numberTarget = { price: [price, setPrice] };

  const handleEdit = () => {
    if (price === "") return;

    const editedProduct = {
      ...product,
      price: price,
    };

    productsDispatch(addProduct(editedProduct));
    navigate("/products");
  };

  return (
    <>
      <div className="max-w-sm mx-auto grid grid-cols-1 gap-2">
        <>
          <div className="col-span-1 justify-self-center text-2xl">
            تفاصيل المنتج
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <span className="justify-self-end">النوع: </span>
            <span className="justify-self-start">{product.type}</span>
          </div>
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <span className="justify-self-end">الاسم: </span>
            <span className="justify-self-start">{product.name}</span>
          </div>
          {isEditMode ? (
            <>
              <div className="col-span-1 grid grid-cols-2 gap-2">
                <span className="justify-self-end">القديم السعر: </span>
                <span className="justify-self-start">{product.price}</span>
              </div>
              <div className="col-span-1 grid grid-cols-2 gap-2">
                <span className="justify-self-end">تعديل السعر: </span>
                <input
                  dir="ltr"
                  inputMode="numeric"
                  type="text"
                  name="editPrice"
                  id="editPrice"
                  className="text-center text-gray-800"
                  value={price}
                  onChange={(e) =>
                    handleNumberInputChange(e, "price", numberTarget)
                  }
                />
              </div>
              <div className="col-span-1 grid">
                <button
                  className="px-3 py-1 bg-blue-500 justify-self-center rounded-md"
                  onClick={() => handleEdit()}>
                  تعديل
                </button>
              </div>
            </>
          ) : (
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <span className="justify-self-end">السعر: </span>
              <span className="justify-self-start">{product.price}</span>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default EditProductItem;

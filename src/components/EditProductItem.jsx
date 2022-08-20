import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsStore } from "../contexts/productsContext";
import { addProduct } from "../contexts/productsContext/productsActions";
import { handleNumberInputChange } from "../utils";

const EditProductItem = ({ isEditMode }) => {
  // const navigate = useNavigate();
  const { productId } = useParams();
  const { productsState, productsDispatch } = useContext(ProductsStore);
  const product = productsState[productId];
  const [price, setPrice] = useState("");
  const numberTarget = { price: [price, setPrice] };
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  const handleEdit = () => {
    if (price === "") return;

    const editedProduct = {
      ...product,
      priceHistory: [...product.priceHistory, { date, price: +price }].sort(
        (a, b) => {
          console.log(new Date(a.date).getTime(), new Date(b.date).getTime());
          return new Date(a.date).getTime() > new Date(b.date).getTime()
            ? 1
            : -1;
        }
      ),
    };

    productsDispatch(addProduct(editedProduct));
    // navigate("/products");
    setPrice("");
  };

  return (
    <>
      <div className='max-w-sm mx-auto grid grid-cols-1 gap-2'>
        <div className='col-span-1 justify-self-center text-2xl'>
          تفاصيل المنتج
        </div>
        <div className='col-span-1 grid grid-cols-2 gap-2'>
          <span className='justify-self-end'>النوع: </span>
          <span className='justify-self-start'>{product.type}</span>
        </div>
        <div className='col-span-1 grid grid-cols-2 gap-2'>
          <span className='justify-self-end'>الاسم: </span>
          <span className='justify-self-start'>{product.name}</span>
        </div>
        {isEditMode && (
          <>
            <div className='col-span-1 grid grid-cols-2 gap-2'>
              <span className='justify-self-end'>أخر سعر: </span>
              <span className='justify-self-start'>
                {product.priceHistory[product.priceHistory.length - 1].price}
              </span>
            </div>
            <div className='col-span-1 grid grid-cols-2 gap-2'>
              <span className='justify-self-end'>تعديل السعر: </span>
              <input
                dir='ltr'
                inputMode='numeric'
                type='text'
                name='editPrice'
                id='editPrice'
                className='text-center text-gray-800'
                value={price}
                onChange={(e) =>
                  handleNumberInputChange(e, "price", numberTarget)
                }
              />
            </div>
            <div className='col-span-1 flex xs:justify-self-end'>
              <label htmlFor='startDate'>تاريخ تغير السعر:</label>
              <input
                type='date'
                name='startDate'
                id='startDate'
                className='text-center text-gray-800'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className='col-span-1 grid'>
              <button
                className='px-3 py-1 bg-blue-500 justify-self-center rounded-md'
                onClick={() => handleEdit()}>
                تعديل
              </button>
            </div>
          </>
        )}
        <div className='col-span-1'>تاريخ الأسعار</div>
        {product.priceHistory.map((price, index) => {
          return (
            <div key={index} className='col-span-1 grid grid-cols-2 gap-2'>
              <span className='justify-self-end'>{price.date}: </span>
              <span className='justify-self-start'>{price.price}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EditProductItem;

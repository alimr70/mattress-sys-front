const ProductItem = ({ product }) => {
  const { type, name, price } = product;
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-evenly md:justify-between flex-row text-right">
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          المنتج: <span className="text-blue-500">{type}</span>
        </p>
        <p className="m-1">
          الاسم: <span className="text-blue-500">{name}</span>
        </p>
      </div>
      {/* <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          العرض: <span className="text-blue-500">{width}</span>
        </p>
        <p className="m-1">
          الطول: <span className="text-blue-500">{height}</span>
        </p>
        <p className="m-1">
          الارتفاع: <span className="text-blue-500">{thickness}</span>
        </p>
      </div> */}
      <div className="p-2 ti:flex flex-row">
        <p className="m-1">
          سعر البيع الحالي: <span className="text-green-500">{price}</span>
        </p>
      </div>
    </li>
  );
};

export default ProductItem;

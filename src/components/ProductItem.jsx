const ProductItem = ({ product }) => {
  const {
    type,
    name,
    category,
    weight,
    thickness,
    width,
    height,
    price,
    quantity,
    companyDiscount,
  } = product;
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-evenly md:justify-between flex-row-reverse text-right">
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          المنتج: <span className="text-blue-500">{type}</span>
        </p>
        <p className="m-1">
          الاسم: <span className="text-blue-500">{name}</span>
        </p>
        <p className="m-1">
          النوع: <span className="text-blue-500">{category}</span>
        </p>
      </div>
      <div className="p-2 ti:flex flex-row-reverse">
        {weight && (
          <p className="m-1">
            الوزن: <span className="text-blue-500">{weight}</span>
          </p>
        )}
        <p className="m-1">
          الارتفاع: <span className="text-blue-500">{thickness}</span>
        </p>
        <p className="m-1">
          العرض: <span className="text-blue-500">{width}</span>
        </p>
        <p className="m-1">
          الطول: <span className="text-blue-500">{height}</span>
        </p>
      </div>
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          السعر: <span className="text-green-500">{price}</span>
        </p>
        {quantity && (
          <p className="m-1">
            العدد بالمخزن: <span className="text-blue-500">{quantity}</span>
          </p>
        )}
        {companyDiscount && (
          <p className="m-1">
            خصم الشركة:
            <span className="text-red-500">%{+companyDiscount * 100}</span>
          </p>
        )}
      </div>
    </li>
  );
};

export default ProductItem;

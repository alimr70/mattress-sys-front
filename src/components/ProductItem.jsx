const ProductItem = ({
  productType,
  name,
  category,
  weight,
  thickness,
  width,
  height,
  price,
  quantity,
  companyDiscount,
}) => {
  return (
    <li className="m-2 rounded-md bg-gray-700 flex flex-wrap items-center justify-center md:justify-around flex-row-reverse text-right">
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          المنتج: <span class="text-blue-500">{productType}</span>
        </p>
        <p className="m-1">
          الاسم: <span class="text-blue-500">{name}</span>
        </p>
        <p className="m-1">
          النوع: <span class="text-blue-500">{category}</span>
        </p>
      </div>
      <div className="p-2 ti:flex flex-row-reverse">
        {weight && (
          <p className="m-1">
            الوزن: <span class="text-blue-500">{weight}</span>
          </p>
        )}
        <p className="m-1">
          الارتفاع: <span class="text-blue-500">{thickness}</span>
        </p>
        <p className="m-1">
          العرض: <span class="text-blue-500">{width}</span>
        </p>
        <p className="m-1">
          الطول: <span class="text-blue-500">{height}</span>
        </p>
      </div>
      <div className="p-2 ti:flex flex-row-reverse">
        <p className="m-1">
          السعر: <span class="text-green-500">{price}</span>
        </p>
        {quantity && (
          <p className="m-1">
            العدد بالمخزن: <span class="text-blue-500">{quantity}</span>
          </p>
        )}
        {companyDiscount && (
          <p className="m-1">
            خصم الشركة:
            <span class="text-red-500">%{+companyDiscount * 100}</span>
          </p>
        )}
      </div>
    </li>
  );
};

export default ProductItem;

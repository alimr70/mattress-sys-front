import { useContext, useState } from "react";
import { CustomDimensionStore } from "../contexts/customDimensionContext";
import {
  DetailsProperty,
  PropertyCell,
  PropertyLabel,
  PropertyNumericalInput,
} from "./SharedComponents";

const CustomDimension = () => {
  const [customDimensionProduct, setCustomDimensionProduct] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const { customDimensionState } = useContext(CustomDimensionStore);
  const customDimensionProducts = Object.values(customDimensionState);
  const customDimensionProductPrice =
    customDimensionState[customDimensionProduct]?.priceHistory[
      customDimensionState[customDimensionProduct]?.priceHistory.length - 1
    ].price;

  const customPrice =
    (+width / 100) * (+height / 100) * customDimensionProductPrice;

  const numberTargets = {
    width: [width, setWidth],
    height: [height, setHeight],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='max-w-sm mx-auto'
      autoComplete='off'>
      <div className='m-5 grid grid-cols-3'>
        <label htmlFor='type' className='m-2 col-span-1 justify-self-start'>
          سعر م2 لل
        </label>
        <select
          name='type'
          id='type'
          className='col-span-2 text-gray-800'
          value={customDimensionProduct}
          onChange={(e) => setCustomDimensionProduct(e.target.value)}
          required>
          <option className='text-center text-gray-500' value='' defaultValue>
            إختر نوع المنتج
          </option>
          {customDimensionProducts.map((product) => {
            return (
              <option
                key={product.id}
                value={product.id}
                className='text-center text-gray-800'>
                {product.name}
              </option>
            );
          })}
        </select>
      </div>
      <PropertyCell>
        <PropertyLabel forName={"width"} title={"العرض"} />
        <PropertyNumericalInput
          numberTargetProperty={"width"}
          numberTargetValue={width}
          numberTargets={numberTargets}
        />
      </PropertyCell>
      <PropertyCell>
        <PropertyLabel forName={"height"} title={"الطول"} />
        <PropertyNumericalInput
          numberTargetProperty={"height"}
          numberTargetValue={height}
          numberTargets={numberTargets}
        />
      </PropertyCell>
      <DetailsProperty
        title={"السعر"}
        property={
          <span className='text-green-400 font-bold'>
            {!isNaN(customPrice) ? Math.floor(customPrice) : ""}
          </span>
        }
      />
    </form>
  );
};

export default CustomDimension;

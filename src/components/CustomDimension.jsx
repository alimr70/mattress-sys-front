import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomDimensionStore } from "../contexts/customDimensionContext";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { addSerialNumber } from "../contexts/generalTypesContext/generalTypesActions";
import { ProductsStore } from "../contexts/productsContext";
import { addProduct } from "../contexts/productsContext/productsActions";
import { generateSerialNumber } from "../utils";
import {
  DetailsProperty,
  PropertyCell,
  PropertyLabel,
  PropertyNumericalInput,
} from "./SharedComponents";

const CustomDimension = () => {
  const navigate = useNavigate();

  const [warehouseSerialNum, setWarehouseSerialNum] = useState("");
  const { generalTypesState, generalTypesDispatch } =
    useContext(GeneralTypesStore);
  const { serialNumbers } = generalTypesState;
  const { warehouseSerials } = serialNumbers;

  const { productsDispatch } = useContext(ProductsStore);

  const [customDimensionProductId, setCustomDimensionProductId] = useState("");

  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const { customDimensionState } = useContext(CustomDimensionStore);
  const customDimensionProducts = Object.values(customDimensionState);
  const customDimensionProduct = customDimensionState[customDimensionProductId];
  const customDimensionProductPrice =
    customDimensionProduct?.priceHistory[
      customDimensionProduct?.priceHistory.length - 1
    ].price;

  const customPrice =
    (+width / 100) * (+height / 100) * customDimensionProductPrice;

  const numberTargets = {
    width: [width, setWidth],
    height: [height, setHeight],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullThickness =
      customDimensionProduct.thickness !== ""
        ? " × " + customDimensionProduct.thickness
        : "";

    const fullHeight = height !== "" ? " × " + height : "";

    const fullName =
      customDimensionProduct.name +
      " مقاس خاص " +
      width +
      fullHeight +
      fullThickness;

    const product = {
      id: nanoid(10),
      type: "مرتبة",
      name: fullName,
      thickness: customDimensionProduct.thickness,
      width,
      height,
      priceHistory: [{ date, price: +Math.ceil(customPrice) }],
      warehouseId: warehouseSerialNum,
    };
    generalTypesDispatch(
      addSerialNumber(`${warehouseSerialNum}`, "warehouseSerials")
    );
    productsDispatch(addProduct(product));
    navigate("/products");
  };

  // Generate serialnumber
  useEffect(() => {
    setWarehouseSerialNum(
      generateSerialNumber(
        `${+warehouseSerials[warehouseSerials.length - 1] + 1}`
      )
    );
  }, [warehouseSerials]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='max-w-sm mx-auto'
      autoComplete='off'>
      <div className='m-5 grid grid-cols-3'>
        <label
          htmlFor='startDate'
          className='m-2 col-span-1 justify-self-start'>
          تاريخ ليستة السعر:
        </label>
        <input
          type='date'
          name='startDate'
          id='startDate'
          className='col-span-2 text-gray-800 text-center'
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className='m-5 grid grid-cols-3'>
        <label htmlFor='type' className='m-2 col-span-1 justify-self-start'>
          سعر م2 للمرتبة
        </label>
        <select
          name='type'
          id='type'
          className='col-span-2 text-gray-800'
          value={customDimensionProductId}
          onChange={(e) => setCustomDimensionProductId(e.target.value)}
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
                {product.name +
                  (product.name.includes("ماريو") ||
                  product.name.includes("نيو")
                    ? " " + product.thickness
                    : "")}
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
            {!isNaN(customPrice) ? Math.ceil(customPrice) : ""}
          </span>
        }
      />
      <div className='flex justify-center'>
        <button type='submit' className='px-5 py-2 bg-blue-500 rounded-md'>
          إضافة
        </button>
      </div>
    </form>
  );
};

export default CustomDimension;

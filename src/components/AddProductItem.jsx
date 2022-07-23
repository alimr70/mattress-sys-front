import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { addSerialNumber } from "../contexts/generalTypesContext/generalTypesActions";
import { ProductsStore } from "../contexts/productsContext";
import { addProduct } from "../contexts/productsContext/productsActions";
import { generateSerialNumber } from "../utils";
import {
  PropertyCell,
  PropertyLabel,
  PropertyNumericalInput,
} from "./SharedComponents";

const AddProductItem = () => {
  const { productsDispatch } = useContext(ProductsStore);
  const { generalTypesState, generalTypesDispatch } =
    useContext(GeneralTypesStore);
  const { productTypes, serialNumbers } = generalTypesState;
  const { warehouseSerials } = serialNumbers;

  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const [type, setType] = useState("");
  const [warehouseSerialNum, setWarehouseSerialNum] = useState("");
  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const numberTargets = {
    width: [width, setWidth],
    height: [height, setHeight],
    thickness: [thickness, setThickness],
    price: [price, setPrice],
    weight: [weight, setWeight],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullWeight = weight !== "" ? " - " + weight + "جم" : "";

    const fullThickness = thickness !== "" ? " × " + thickness : "";

    const fullHeight = height !== "" ? " × " + height : "";

    const fullName =
      name + " " + width + fullHeight + fullThickness + fullWeight;

    const product = {
      id: nanoid(10),
      type,
      name: fullName,
      thickness,
      width,
      height,
      priceHistory: [{ date, price: +price }],
      warehouseId: warehouseSerialNum,
    };
    generalTypesDispatch(
      addSerialNumber(`${warehouseSerialNum}`, "warehouseSerials")
    );
    productsDispatch(addProduct(product));
    setType("");
    setName("");
    setWidth("");
    setHeight("");
    setThickness("");
    setPrice("");
    setWeight("");
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
          نوع المنتج
        </label>
        <select
          name='type'
          id='type'
          className='col-span-2 text-gray-800'
          value={type}
          onChange={(e) => handleTypeChange(e)}
          required>
          <option className='text-center text-gray-500' value='' defaultValue>
            إختر نوع المنتج
          </option>
          {productTypes.map((itemType, index) => {
            return (
              <option
                key={index}
                value={itemType}
                className='text-center text-gray-800'>
                {itemType}
              </option>
            );
          })}
        </select>
      </div>
      <div className='m-5 grid grid-cols-3'>
        <label
          htmlFor='warehouseId'
          className='m-2 col-span-1 justify-self-start'>
          رقم المخزن
        </label>
        <input
          dir='ltr'
          inputMode='numeric'
          type='text'
          name='warehouseId'
          id='warehouseId'
          className='col-span-2 text-center text-gray-800'
          defaultValue={warehouseSerialNum}
          disabled
        />
      </div>
      <div className='m-5 grid grid-cols-3'>
        <label htmlFor='name' className='m-2 col-span-1 justify-self-start'>
          الاسم
        </label>
        <input
          inputMode='numeric'
          type='text'
          name='name'
          id='name'
          className='col-span-2 text-center text-gray-800'
          value={name}
          onChange={(e) => {
            handleNameChange(e);
          }}
          required
        />
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
      <PropertyCell>
        <PropertyLabel forName={"thickness"} title={"الارتفاع"} />
        <PropertyNumericalInput
          numberTargetProperty={"thickness"}
          numberTargetValue={thickness}
          numberTargets={numberTargets}
        />
      </PropertyCell>
      {type === "مخدة" && (
        <PropertyCell>
          <PropertyLabel forName={"weight"} title={"الوزن"} />
          <PropertyNumericalInput
            numberTargetProperty={"weight"}
            numberTargetValue={weight}
            numberTargets={numberTargets}
          />
        </PropertyCell>
      )}
      <PropertyCell>
        <PropertyLabel forName={"price"} title={"السعر"} />
        <PropertyNumericalInput
          numberTargetProperty={"price"}
          numberTargetValue={price}
          numberTargets={numberTargets}
          required={true}
        />
      </PropertyCell>
      <div className='flex justify-center'>
        <button type='submit' className='px-5 py-2 bg-blue-500 rounded-md'>
          إضافة
        </button>
      </div>
    </form>
  );
};

export default AddProductItem;

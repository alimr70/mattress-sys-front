import { nanoid } from "nanoid";
import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { GeneralTypesStore } from "../contexts/generalTypesContext";
import { ProductsStore } from "../contexts/productsContext";
import { addProduct } from "../contexts/productsContext/productsActions";

const AddProductItem = () => {
  const { productsDispatch } = useContext(ProductsStore);
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productTypes } = generalTypesState;
  const itemTypes = Object.values(productTypes);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [warehouseId, setWarehouseId] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberInputChange = (e, numberTarget) => {
    const numberTargets = {
      width: [width, setWidth],
      height: [height, setHeight],
      thickness: [thickness, setThickness],
      price: [price, setPrice],
      warehouseId: [warehouseId, setWarehouseId],
      weight: [weight, setWeight],
    };

    if (isNaN(+e.target.value))
      return numberTargets[numberTarget][1](numberTargets[numberTarget][0]);

    return numberTargets[numberTarget][1](e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullWeight = weight !== "" ? " - " + weight + "جم" : "";

    const fullThickness = thickness !== "" ? " × " + thickness : "";

    const fullName =
      name + " " + width + " × " + height + fullThickness + fullWeight;

    const product = {
      id: nanoid(10),
      type,
      name: fullName,
      thickness,
      width,
      height,
      price,
      warehouseId,
    };
    productsDispatch(addProduct(product));
    setType("");
    setName("");
    setWidth("");
    setHeight("");
    setThickness("");
    setPrice("");
    setWarehouseId("");
    setWeight("");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="max-w-sm mx-auto"
      autoComplete="off">
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="type"
          className="m-2 col-span-1 order-last justify-self-end">
          نوع المنتج
        </label>
        <select
          name="type"
          id="type"
          className="col-span-2 text-gray-800"
          value={type}
          onChange={(e) => handleTypeChange(e)}
          required>
          <option className="text-center text-gray-500" value="" defaultValue>
            إختر نوع المنتج
          </option>
          {itemTypes.map((itemType, index) => {
            return (
              <option
                key={index}
                value={itemType}
                className="text-center text-gray-800">
                {itemType}
              </option>
            );
          })}
        </select>
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="warehouseId"
          className="m-2 col-span-1 order-last justify-self-end">
          رقم المخزن
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="warehouseId"
          id="warehouseId"
          className="col-span-2 text-center text-gray-800"
          value={warehouseId}
          onChange={(e) => {
            handleNumberInputChange(e, "warehouseId");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="name"
          className="m-2 col-span-1 order-last justify-self-end">
          الاسم
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="name"
          id="name"
          className="col-span-2 text-center text-gray-800"
          value={name}
          onChange={(e) => {
            handleNameChange(e);
          }}
          required
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="width"
          className="m-2 col-span-1 order-last justify-self-end">
          العرض
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="width"
          id="width"
          className="col-span-2 text-center text-gray-800"
          value={width}
          onChange={(e) => {
            handleNumberInputChange(e, "width");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="height"
          className="m-2 col-span-1 order-last justify-self-end">
          الطول
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="height"
          id="height"
          className="col-span-2 text-center text-gray-800"
          value={height}
          onChange={(e) => {
            handleNumberInputChange(e, "height");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="thickness"
          className="m-2 col-span-1 order-last justify-self-end">
          الارتفاع
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="thickness"
          id="thickness"
          className="col-span-2 text-center text-gray-800"
          value={thickness}
          onChange={(e) => {
            handleNumberInputChange(e, "thickness");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="weight"
          className="m-2 col-span-1 order-last justify-self-end">
          الوزن
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="weight"
          id="weight"
          className="col-span-2 text-center text-gray-800"
          value={weight}
          onChange={(e) => {
            handleNumberInputChange(e, "weight");
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label
          htmlFor="type"
          className="m-2 col-span-1 order-last justify-self-end">
          السعر
        </label>
        <input
          inputMode="numeric"
          type="text"
          name="width"
          id="width"
          className="col-span-2 text-center text-gray-800"
          value={price}
          onChange={(e) => {
            handleNumberInputChange(e, "price");
          }}
          required
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-5 py-2 bg-blue-500 rounded-md">
          إضافة
        </button>
      </div>
    </form>
  );
};

export default AddProductItem;
/* 
const whichName = {
    مرتبة: mattressNames,
    مخدة: pillowNames,
  };
<select
          name="type"
          id="selectType"
          className="col-span-2 text-gray-800"
          onChange={(e) => {
            handleNameChange(e);
          }}>
          {type !== "" ? (
            whichName[type] ? (
              Object.values(whichName[type]).map(
                (mattressNameOption, index) => {
                  return (
                    <option
                      key={index}
                      value={mattressNameOption}
                      className="text-center text-gray-800">
                      {mattressNameOption}
                    </option>
                  );
                }
              )
            ) : (
              Object.values(otherNames).map((mattressNameOption, index) => {
                return (
                  <option
                    key={index}
                    value={mattressNameOption}
                    className="text-center text-gray-800">
                    {mattressNameOption}
                  </option>
                );
              })
            )
          ) : (
            <option className="text-center" value="" defaultValue>
              أدخل نوع المنتج أولا
            </option>
          )}
        </select> */
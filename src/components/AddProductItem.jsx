import { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { GeneralTypesStore } from "../contexts/generalTypesContext";

const AddProductItem = () => {
  const { generalTypesState } = useContext(GeneralTypesStore);
  const { productTypes, mattressNames, pillowNames, otherNames } =
    generalTypesState;
  const itemTypes = Object.values(productTypes);

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState("");

  const whichName = {
    مرتبة: mattressNames,
    مخدة: pillowNames,
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="max-w-sm mx-auto">
      <div className="m-5 flex flex-row-reverse">
        <label htmlFor="type" className="m-2">
          نوع المنتج
        </label>
        <select
          name="type"
          id="selectType"
          className="text-gray-800"
          onChange={(e) => handleTypeChange(e)}>
          <option className="text-center text-gray-500" value="" selected>
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
      <div className="m-5 flex flex-row-reverse">
        <label htmlFor="type" className="m-2">
          الاسم
        </label>
        <select name="type" id="selectType" className="text-gray-800">
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
            <option value="" selected>
              أدخل نوع المنتج أولا
            </option>
          )}
        </select>
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

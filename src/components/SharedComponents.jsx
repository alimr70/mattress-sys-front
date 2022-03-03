import { handleNumberInputChange } from "../utils";

export const PropertyCell = ({ children }) => {
  return <div className="m-5 grid grid-cols-3">{children}</div>;
};

export const PropertyLabel = ({ title, forName }) => {
  return (
    <label htmlFor={forName} className="m-2 col-span-1 justify-self-start">
      {title}
    </label>
  );
};

export const PropertyNumericalInput = ({
  numberTargetProperty,
  numberTargetValue,
  numberTargets,
  required,
}) => {
  return (
    <input
      dir="ltr"
      inputMode="numeric"
      type="text"
      name={numberTargetProperty}
      id={numberTargetProperty}
      className="col-span-2 text-center text-gray-800"
      value={numberTargetValue}
      onChange={(e) => {
        handleNumberInputChange(e, numberTargetProperty, numberTargets);
      }}
      required={required}
    />
  );
};

export const DetailsProperty = ({ title, property }) => {
  return (
    <div className="col-span-1 grid grid-cols-2 gap-2">
      <span className="justify-self-end">{title}: </span>
      <span className="justify-self-start">{property}</span>
    </div>
  );
};

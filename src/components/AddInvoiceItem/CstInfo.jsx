const CstInfo = ({
  cstName,
  setCstName,
  address,
  setAddress,
  phone,
  handleNumberInputChange,
  phoneTwo,
  step,
  setStep,
}) => {
  return (
    <>
      {/* Cst info */}
      <div className="m-5 grid grid-cols-3">
        <h1 className="my-3 text-xl">بيانات العميل</h1>
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="cstName" className="m-2 col-span-1 justify-self-start">
          الاسم*
        </label>
        <input
          type="text"
          name="cstName"
          id="cstName"
          className="col-span-2 text-center text-gray-800"
          value={cstName}
          onChange={(e) => {
            setCstName(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="address" className="m-2 col-span-1 justify-self-start">
          العنوان*
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="col-span-2 text-center text-gray-800"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="phone" className="m-2 col-span-1 justify-self-start">
          رقم التليفون*
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="phone"
          id="phone"
          className="col-span-2 text-center text-gray-800"
          value={phone}
          onChange={(e) => {
            handleNumberInputChange(e, "phone");
          }}
          maxLength={11}
        />
      </div>
      <div className="m-5 grid grid-cols-3">
        <label htmlFor="phoneTwo" className="m-2 col-span-1 justify-self-start">
          رقم تليفون آخر
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          type="text"
          name="phoneTwo"
          id="phoneTwo"
          className="col-span-2 text-center text-gray-800"
          value={phoneTwo}
          onChange={(e) => {
            handleNumberInputChange(e, "phoneTwo");
          }}
          maxLength={11}
        />
      </div>
    </>
  );
};

export default CstInfo;

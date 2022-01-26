const Container = ({ children, title }) => {
  return (
    <>
      <div className="bg-gray-800 my-5 sm:mx-5 print:m-0 print:sm:m-0 print:bg-white">
        <h1 className="my-2 text-center text-3xl print:hidden">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Container;

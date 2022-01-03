const Container = ({ children, title }) => {
  return (
    <>
      <div className="bg-gray-800 my-5 sm:mx-5 print:m-0 print:bg-white">
        <h1 className="text-center text-3xl print:hidden">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Container;

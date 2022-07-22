import CustomDimension from "../components/CustomDimension";
import Container from "../components/Container";
import Header from "../components/Header";

const AddCustomDimension = () => {
  return (
    <>
      <Header />
      <Container title={"حساب وإضافة مقاس خاص"}>
        <CustomDimension />
      </Container>
    </>
  );
};

export default AddCustomDimension;

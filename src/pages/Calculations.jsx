import CalculationCells from "../components/CalculationCells";
import Container from "../components/Container";
import Header from "../components/Header";

const Calculations = () => {
  return (
    <>
      <Header />
      <Container title="الحسابات">
        <CalculationCells />
      </Container>
    </>
  );
};

export default Calculations;

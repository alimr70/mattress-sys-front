import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import EditProductItem from "../components/EditProductItem";
import Header from "../components/Header";

const DetailsAndEdit = () => {
  let location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <Header />
      <Container title={"تفاصيل وتعديل"}>
        <div>
          <label htmlFor="editMode">تفعيل وضع التعديل</label>
          <input
            type="checkbox"
            name="editMode"
            id="editMode"
            checked={isEditMode}
            onChange={() => setIsEditMode(!isEditMode)}
          />
        </div>
        {location.pathname.startsWith("/products") && (
          <EditProductItem isEditMode={isEditMode} />
        )}
      </Container>
    </>
  );
};

export default DetailsAndEdit;

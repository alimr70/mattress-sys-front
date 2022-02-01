import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import DetailWarehouseItem from "../components/DetailWarehouseItem";
import EditInvoice from "../components/EditInvoice";
import EditProductItem from "../components/EditProductItem";
import Header from "../components/Header";

const DetailsAndEdit = () => {
  let location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [askForDeleteMode, setAskForDeleteMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <>
      <Header />
      <Container title={"تفاصيل وتعديل"}>
        {!location.pathname.startsWith("/warehouse") && (
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
        )}
        {location.pathname.startsWith("/products") && (
          <EditProductItem isEditMode={isEditMode} />
        )}
        {location.pathname.startsWith("/warehouse") && <DetailWarehouseItem />}
        {location.pathname.startsWith("/invoices") && (
          <>
            <div>
              <label htmlFor="isDeleteMode">تفعيل وضع الحذف</label>
              <input
                type="checkbox"
                name="isDeleteMode"
                id="isDeleteMode"
                checked={isDeleteMode}
                onChange={() => {
                  if (!askForDeleteMode) {
                    setAskForDeleteMode(true);
                  } else {
                    setIsDeleteMode(false);
                    setAskForDeleteMode(false);
                  }
                }}
              />
            </div>
            <EditInvoice
              isEditMode={isEditMode}
              askForDeleteMode={askForDeleteMode}
              setAskForDeleteMode={setAskForDeleteMode}
              isDeleteMode={isDeleteMode}
              setIsDeleteMode={setIsDeleteMode}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default DetailsAndEdit;

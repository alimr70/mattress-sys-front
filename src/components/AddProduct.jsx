import { useState } from "react";

const AddProduct = () => {
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [weight, setWeight] = useState();
  const [thickness, setThickness] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [price, setPrice] = useState();
};

const ProductTypes = {
  1: "مرتبة",
  2: "مخدة",
  3: "ميلتون",
  4: "ميلتون بشكير",
  5: "باف",
  6: "سرير حديد بالعجل بالمرتبة",
  7: "سرير إنتركونتننتال",
};

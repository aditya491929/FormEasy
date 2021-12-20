import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { Empty } from "antd";

const CategoryTemplate = (props) => {
  const { userData } = useContext(UserContext);
  const [categoryForms, setCategoryForms] = useState([]);

  return (
    <>
      <h2>{props.categoryName}</h2>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
      />
    </>
  );
};

export default CategoryTemplate;

import React from "react";
import { Empty } from "antd";

const Categories = () => {
  return (
    <>
      <h1>Categories</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
      />
    </>
  );
};

export default Categories;

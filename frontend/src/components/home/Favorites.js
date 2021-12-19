import React from "react";
import { Empty } from "antd";

const Favorites = () => {
  return (
    <>
      <h1>Favorites</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span>No Forms Found!</span>}
      ></Empty>
    </>
  );
};

export default Favorites;

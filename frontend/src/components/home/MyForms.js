import React from "react";
import { Empty } from "antd";
import { Button } from "react-bootstrap";

const MyForms = () => {
  return (
    <>
      <h1>MyForms</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span>No Forms Found!</span>}
      >
        <Button variant="dark">Create Form</Button>
      </Empty>
    </>
  );
};

export default MyForms;
